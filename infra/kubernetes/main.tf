/**
 * Kubernetes objects for the Apollo Client Server Prototype.
 * Author: Andrew Jarombek
 * Date: 10/1/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.13"

  required_providers {
    aws = ">= 3.7.0"
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
  cert_arn = data.aws_acm_certificate.proto-jarombek-com-cert.arn
  wildcard_cert_arn = data.aws_acm_certificate.apollo-proto-jarombek-com-cert.arn
  subnet1 = data.aws_subnet.kubernetes-dotty-public-subnet.id
  subnet2 = data.aws_subnet.kubernetes-grandmas-blanket-public-subnet.id
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
  token = data.aws_eks_cluster_auth.cluster.token
  load_config_file = false
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
    container {
      name = "apollo-prototype-database"
      image = "ajarombek/apollo-prototype-database:latest"

      port {
        container_port = 5432
        protocol = "TCP"
      }
    }
  }
}

resource "kubernetes_pod" "server" {
  metadata {
    name = "apollo-prototype-server"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
    }
  }

  spec {
    container {
      name = "apollo-prototype-server"
      image = "ajarombek/apollo-prototype-server:latest"

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
}

resource "kubernetes_deployment" "client" {
  metadata {
    name = "apollo-prototype-client-deployment"
    namespace = "sandbox"

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
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

    template {
      metadata {
        labels = {
          version = "v1.0.0"
          environment = "production"
          application = "apollo-client-server-prototype"
        }
      }

      spec {
        container {
          name = "apollo-prototype-client"
          image = "ajarombek/apollo-prototype-client:latest"

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
