/**
 * Kubernetes objects for the Apollo Client Server Prototype.
 * Author: Andrew Jarombek
 * Date: 10/1/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 1.0.1"

  required_providers {
    aws = ">= 3.50.0"
    kubernetes = ">= 1.11"
  }

  backend "s3" {
    bucket = "andrew-jarombek-terraform-state"
    encrypt = true
    key = "sandbox/apollo-client-server-prototype/kubernetes"
    region = "us-east-1"
  }
}

#-----------------------
# Existing AWS Resources
#-----------------------

data "aws_acm_certificate" "proto-jarombek-com-cert" {
  domain = "*.proto.jarombek.com"
}

data "aws_acm_certificate" "apollo-proto-jarombek-com-cert" {
  domain = "*.apollo.proto.jarombek.com"
}

data "aws_eks_cluster" "cluster" {
  name = "andrew-jarombek-eks-cluster"
}

data "aws_eks_cluster_auth" "cluster" {
  name = "andrew-jarombek-eks-cluster"
}

data "aws_subnet" "kubernetes-dotty-public-subnet" {
  tags = {
    Name = "kubernetes-dotty-public-subnet"
  }
}

data "aws_subnet" "kubernetes-grandmas-blanket-public-subnet" {
  tags = {
    Name = "kubernetes-grandmas-blanket-public-subnet"
  }
}

data "aws_vpc" "application-vpc" {
  tags = {
    Name = "application-vpc"
  }
}

#----------------
# Local Variables
#----------------

locals {
  short_version = "1.0.0"
  version = "v${local.short_version}"
  cert_arn = data.aws_acm_certificate.proto-jarombek-com-cert.arn
  wildcard_cert_arn = data.aws_acm_certificate.apollo-proto-jarombek-com-cert.arn
  certificates = "${local.cert_arn},${local.wildcard_cert_arn}"
  subnet1 = data.aws_subnet.kubernetes-dotty-public-subnet.id
  subnet2 = data.aws_subnet.kubernetes-grandmas-blanket-public-subnet.id
  host1 = "apollo.proto.jarombek.com"
  host2 = "www.apollo.proto.jarombek.com"
}

#-----------------------
# New AWS Infrastructure
#-----------------------

resource "aws_security_group" "apollo-prototype-lb-sg" {
  name = "apollo-prototype-lb-security-group"
  vpc_id = data.aws_vpc.application-vpc.id

  lifecycle {
    create_before_destroy = true
  }

  ingress {
    protocol = "tcp"
    from_port = 80
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol = "tcp"
    from_port = 443
    to_port = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol = "-1"
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "apollo-prototype-lb-security-group"
    Application = "apollo-client-server-prototype"
    Environment = "production"
  }
}

#-------------------------
# New Kubernetes Resources
#-------------------------

provider "kubernetes" {
  host = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)

  exec {
    api_version = "client.authentication.k8s.io/v1alpha1"
    command = "aws"
    args = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.cluster.name]
  }
}

resource "kubernetes_pod" "database" {
  metadata {
    name = "apollo-prototype-database"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
    }
  }

  spec {
    affinity {
      node_affinity {
        required_during_scheduling_ignored_during_execution {
          node_selector_term {
            match_expressions {
              key = "workload"
              operator = "In"
              values = ["development-tests"]
            }
          }
        }
      }
    }

    container {
      name = "apollo-prototype-database"
      image = "ajarombek/apollo-client-server-prototype-database:latest"

      port {
        container_port = 5432
        protocol = "TCP"
      }
      
      // Of course you can :)

      env {
        name = "POSTGRES_PASSWORD"
        value = "apollolocal"
      }
    }
  }
}

resource "kubernetes_pod" "server-app" {
  metadata {
    name = "apollo-prototype-server-app"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
      task = "app"
    }
  }

  spec {
    affinity {
      node_affinity {
        required_during_scheduling_ignored_during_execution {
          node_selector_term {
            match_expressions {
              key = "workload"
              operator = "In"
              values = ["development-tests"]
            }
          }
        }
      }
    }

    container {
      name = "apollo-prototype-server-app"
      image = "ajarombek/apollo-client-server-prototype-api-app:latest"

      readiness_probe {
        period_seconds = 5
        initial_delay_seconds = 20

        http_get {
          path = "/ping"
          port = 80
        }
      }

      port {
        container_port = 80
        protocol = "TCP"
      }
    }
  }

  depends_on = [kubernetes_pod.database]
}

resource "kubernetes_pod" "server-nginx" {
  metadata {
    name = "apollo-prototype-server"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
      task = "nginx"
    }
  }

  spec {
    affinity {
      node_affinity {
        required_during_scheduling_ignored_during_execution {
          node_selector_term {
            match_expressions {
              key = "workload"
              operator = "In"
              values = ["development-tests"]
            }
          }
        }
      }
    }

    container {
      name = "apollo-prototype-server-nginx"
      image = "ajarombek/apollo-client-server-prototype-api-nginx:latest"

      readiness_probe {
        period_seconds = 5
        initial_delay_seconds = 20

        http_get {
          path = "/ping"
          port = 80
        }
      }

      port {
        container_port = 80
        protocol = "TCP"
      }
    }
  }

  depends_on = [kubernetes_pod.server-app]
}

resource "kubernetes_deployment" "client" {
  metadata {
    name = "apollo-prototype-client-deployment"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
      task = "web"
    }
  }

  spec {
    replicas = 1
    min_ready_seconds = 10

    strategy {
      type = "RollingUpdate"

      rolling_update {
        max_surge = "1"
        max_unavailable = "0"
      }
    }

    selector {
      match_labels = {
        version = "v1.0.0"
        environment = "production"
        application = "apollo-client-server-prototype"
        task = "web"
      }
    }

    template {
      metadata {
        labels = {
          version = "v1.0.0"
          environment = "production"
          application = "apollo-client-server-prototype"
          task = "web"
        }
      }

      spec {
        affinity {
          node_affinity {
            required_during_scheduling_ignored_during_execution {
              node_selector_term {
                match_expressions {
                  key = "workload"
                  operator = "In"
                  values = ["development-tests"]
                }
              }
            }
          }
        }

        container {
          name = "apollo-prototype-client"
          image = "ajarombek/apollo-client-server-prototype-web:latest"

          readiness_probe {
            period_seconds = 5
            initial_delay_seconds = 20

            http_get {
              path = "/"
              port = 80
            }
          }

          port {
            container_port = 80
            protocol = "TCP"
          }
        }
      }
    }
  }

  depends_on = [kubernetes_pod.server-nginx]
}

resource "kubernetes_service" "client" {
  metadata {
    name = "apollo-prototype-client-service"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
    }
  }

  spec {
    type = "NodePort"

    port {
      port = 80
      target_port = 80
      protocol = "TCP"
    }

    selector = {
      application = "apollo-client-server-prototype"
    }
  }
}

resource "kubernetes_ingress" "apollo-prototype" {
  metadata {
    name = "apollo-prototype-ingress"
    namespace = "sandbox"

    annotations = {
      "kubernetes.io/ingress.class" = "alb"
      "external-dns.alpha.kubernetes.io/hostname" = "${local.host1},${local.host2}"
      "alb.ingress.kubernetes.io/actions.ssl-redirect" = "{\"Type\": \"redirect\", \"RedirectConfig\": {\"Protocol\": \"HTTPS\", \"Port\": \"443\", \"StatusCode\": \"HTTP_301\"}}"
      "alb.ingress.kubernetes.io/backend-protocol" = "HTTP"
      "alb.ingress.kubernetes.io/certificate-arn" = local.certificates
      "alb.ingress.kubernetes.io/healthcheck-path" = "/"
      "alb.ingress.kubernetes.io/listen-ports" = "[{\"HTTP\":80}, {\"HTTPS\":443}]"
      "alb.ingress.kubernetes.io/healthcheck-protocol": "HTTP"
      "alb.ingress.kubernetes.io/scheme" = "internet-facing"
      "alb.ingress.kubernetes.io/security-groups" = aws_security_group.apollo-prototype-lb-sg.id
      "alb.ingress.kubernetes.io/subnets" = "${local.subnet1},${local.subnet2}"
      "alb.ingress.kubernetes.io/target-type" = "instance"
      "alb.ingress.kubernetes.io/tags" = "Name=apollo-client-server-prototype-load-balancer,Application=apollo-client-server-prototype,Environment=sandbox"
    }

    labels = {
      version = local.version
      environment = "sandbox"
      application = "apollo-client-server-prototype"
    }
  }

  spec {
    rule {
      host = local.host1

      http {
        path {
          path = "/*"

          backend {
            service_name = "ssl-redirect"
            service_port = "use-annotation"
          }
        }

        path {
          path = "/*"

          backend {
            service_name = "apollo-prototype-client-service"
            service_port = 80
          }
        }
      }
    }

    rule {
      host = local.host2

      http {
        path {
          path = "/*"

          backend {
            service_name = "ssl-redirect"
            service_port = "use-annotation"
          }
        }

        path {
          path = "/*"

          backend {
            service_name = "apollo-prototype-client-service"
            service_port = 80
          }
        }
      }
    }
  }
}
