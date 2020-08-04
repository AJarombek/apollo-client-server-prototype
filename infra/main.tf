/**
 * Infrastructure for the Apollo Client Server Prototype.
 * Author: Andrew Jarombek
 * Date: 5/17/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.12"

  required_providers {
    aws = ">= 2.70.0"
  }

  backend "s3" {
    bucket = "andrew-jarombek-terraform-state"
    encrypt = true
    key = "sandbox/apollo-client-server-prototype/main"
    region = "us-east-1"
  }
}

#-----------------------
# Existing AWS Resources
#-----------------------

data "aws_route53_zone" "jarombek" {
  name = "jarombek.com."
}

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

data "aws_vpc" "kubernetes-vpc" {
  tags = {
    Name = "kubernetes-vpc"
  }
}

#----------------
# Local Variables
#----------------

locals {
  cert_arn = data.aws_acm_certificate.proto-jarombek-com-cert
  wildcard_cert_arn = data.aws_acm_certificate.apollo-proto-jarombek-com-cert
  subnet1 = data.aws_subnet.kubernetes-dotty-public-subnet.id
  subnet2 = data.aws_subnet.kubernetes-grandmas-blanket-public-subnet.id
}

#--------------------------------------
# New AWS Resources for S3 & CloudFront
#--------------------------------------

resource "aws_s3_bucket" "apollo-proto-jarombek" {
  bucket = "asset.apollo.proto.jarombek.com"
  acl = "public-read"
  policy = file("${path.module}/policy.json")

  tags = {
    Name = "apollo.proto.jarombek.com"
    Environment = "production"
  }

  website {
    index_document = "lilac.jpg"
    error_document = "lilac.jpg"
  }
}

resource "aws_cloudfront_distribution" "apollo-proto-jarombek-distribution" {
  origin {
    domain_name = aws_s3_bucket.apollo-proto-jarombek.bucket_regional_domain_name
    origin_id = "origin-bucket-${aws_s3_bucket.apollo-proto-jarombek.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin-access-identity.cloudfront_access_identity_path
    }
  }

  # Whether the cloudfront distribution is enabled to accept user requests
  enabled = true

  # Which HTTP version to use for requests
  http_version = "http2"

  # Whether the cloudfront distribution can use ipv6
  is_ipv6_enabled = true

  comment = "asset.apollo.proto.jarombek.com CloudFront Distribution"
  default_root_object = "index.html"

  # Extra CNAMEs for this distribution
  aliases = ["asset.apollo.proto.jarombek.com"]

  # The pricing model for CloudFront
  price_class = "PriceClass_100"

  default_cache_behavior {
    # Which HTTP verbs CloudFront processes
    allowed_methods = ["HEAD", "GET"]

    # Which HTTP verbs CloudFront caches responses to requests
    cached_methods = ["HEAD", "GET"]

    forwarded_values {
      cookies {
        forward = "none"
      }
      query_string = false
    }

    target_origin_id = "origin-bucket-${aws_s3_bucket.apollo-proto-jarombek.id}"

    # Which protocols to use when accessing items from CloudFront
    viewer_protocol_policy = "redirect-to-https"

    # Determines the amount of time an object exists in the CloudFront cache
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # The SSL certificate for CloudFront
  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.apollo-proto-jarombek-com-cert.arn
    ssl_support_method = "sni-only"
  }

  tags = {
    Name = "asset-apollo-proto-jarombek-com-cloudfront"
    Environment = "production"
  }
}

resource "aws_cloudfront_origin_access_identity" "origin-access-identity" {
  comment = "asset.apollo.proto.jarombek.com origin access identity"
}

resource "aws_route53_record" "asset-apollo-proto-jarombek-a" {
  name = "asset.apollo.proto.jarombek.com."
  type = "A"
  zone_id = data.aws_route53_zone.jarombek.zone_id

  alias {
    evaluate_target_health = false
    name = aws_cloudfront_distribution.apollo-proto-jarombek-distribution.domain_name
    zone_id = aws_cloudfront_distribution.apollo-proto-jarombek-distribution.hosted_zone_id
  }
}

#-------------------
# S3 Bucket Contents
#-------------------

resource "aws_s3_bucket_object" "azalea-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "azalea.heic"
  source = "images/azalea.heic"
  etag = filemd5("${path.cwd}/images/azalea.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "azalea-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "azalea.jpg"
  source = "images/azalea.jpg"
  etag = filemd5("${path.cwd}/images/azalea.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "baby-primrose-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "baby-primrose.heic"
  source = "images/baby-primrose.heic"
  etag = filemd5("${path.cwd}/images/baby-primrose.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "baby-primrose-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "baby-primrose.jpg"
  source = "images/baby-primrose.jpg"
  etag = filemd5("${path.cwd}/images/baby-primrose.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "geranium-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "geranium.heic"
  source = "images/geranium.heic"
  etag = filemd5("${path.cwd}/images/geranium.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "geranium-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "geranium.jpg"
  source = "images/geranium.jpg"
  etag = filemd5("${path.cwd}/images/geranium.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "heart-flower-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "heart-flower.heic"
  source = "images/heart-flower.heic"
  etag = filemd5("${path.cwd}/images/heart-flower.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "heart-flower-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "heart-flower.jpg"
  source = "images/heart-flower.jpg"
  etag = filemd5("${path.cwd}/images/heart-flower.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "lilac-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "lilac.heic"
  source = "images/lilac.heic"
  etag = filemd5("${path.cwd}/images/lilac.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "lilac-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "lilac.jpg"
  source = "images/lilac.jpg"
  etag = filemd5("${path.cwd}/images/lilac.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "periwinkle-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "periwinkle.heic"
  source = "images/periwinkle.heic"
  etag = filemd5("${path.cwd}/images/periwinkle.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "periwinkle-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "periwinkle.jpg"
  source = "images/periwinkle.jpg"
  etag = filemd5("${path.cwd}/images/periwinkle.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "pulmonaria-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "pulmonaria.heic"
  source = "images/pulmonaria.heic"
  etag = filemd5("${path.cwd}/images/pulmonaria.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "pulmonaria-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "pulmonaria.jpg"
  source = "images/pulmonaria.jpg"
  etag = filemd5("${path.cwd}/images/pulmonaria.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "sage-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "sage.heic"
  source = "images/sage.heic"
  etag = filemd5("${path.cwd}/images/sage.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "sage-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "sage.jpg"
  source = "images/sage.jpg"
  etag = filemd5("${path.cwd}/images/sage.jpg")
  content_type = "image/jpg"
}

resource "aws_s3_bucket_object" "zinnia-heic" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "zinnia.heic"
  source = "images/zinnia.heic"
  etag = filemd5("${path.cwd}/images/zinnia.heic")
  content_type = "image/heic"
}

resource "aws_s3_bucket_object" "zinnia-jpg" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  key = "zinnia.jpg"
  source = "images/zinnia.jpg"
  etag = filemd5("${path.cwd}/images/zinnia.jpg")
  content_type = "image/jpg"
}

resource "aws_security_group" "apollo-prototype-lb-sg" {
  name = "apollo-prototype-lb-security-group"
  vpc_id = data.aws_vpc.kubernetes-vpc.id

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

resource "kubernetes_ingress" "ingress" {
  metadata {
    name = "apollo-prototype-client-ingress"
    namespace = "sandbox"

    annotations = {
      "kubernetes.io/ingress.class" = "alb"
      "external-dns.alpha.kubernetes.io/hostname" = "apollo.proto.jarombek.com,www.apollo.proto.jarombek.com"
      "alb.ingress.kubernetes.io/backend-protocol" = "HTTP"
      "alb.ingress.kubernetes.io/certificate-arn" = "${local.cert_arn},${local.wildcard_cert_arn}"
      "alb.ingress.kubernetes.io/healthcheck-path" = "/login"
      "alb.ingress.kubernetes.io/listen-ports" = "[{\"HTTP\":80}, {\"HTTPS\":443}]"
      "alb.ingress.kubernetes.io/healthcheck-protocol": "HTTP"
      "alb.ingress.kubernetes.io/scheme" = "internet-facing"
      "alb.ingress.kubernetes.io/security-groups" = aws_security_group.apollo-prototype-lb-sg.id
      "alb.ingress.kubernetes.io/subnets" = "${local.subnet1},${local.subnet2}"
      "alb.ingress.kubernetes.io/target-type" = "instance"
      "alb.ingress.kubernetes.io/tags" = "Name=apollo-prototype-load-balancer,Application=apollo-client-server-prototype,Environment=production"
    }

    labels = {
      version = "v1.0.0"
      environment = "production"
      application = "apollo-client-server-prototype"
    }
  }

  spec {
    rule {
      host = "apollo.proto.jarombek.com"

      http {
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
      host = "www.apollo.proto.jarombek.com"

      http {
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
