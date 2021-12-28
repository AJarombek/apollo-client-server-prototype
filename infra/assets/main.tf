/**
 * Infrastructure for the Asset S3 bucket used by the Apollo Client Server Prototype.
 * Author: Andrew Jarombek
 * Date: 5/17/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 1.1.2"

  required_providers {
    aws = ">= 3.70.0"
  }

  backend "s3" {
    bucket = "andrew-jarombek-terraform-state"
    encrypt = true
    key = "sandbox/apollo-client-server-prototype/assets"
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

#--------------------------------------
# New AWS Resources for S3 & CloudFront
#--------------------------------------

resource "aws_s3_bucket" "apollo-proto-jarombek" {
  bucket = "asset.apollo.proto.jarombek.com"
  acl = "public-read"

  tags = {
    Name = "apollo.proto.jarombek.com"
    Environment = "production"
    Application = "apollo-client-server-prototype"
  }

  website {
    index_document = "lilac.jpg"
    error_document = "lilac.jpg"
  }
}

resource "aws_s3_bucket_policy" "apollo-proto-jarombek" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id
  policy = data.aws_iam_policy_document.apollo-proto-jarombek.json
}

data "aws_iam_policy_document" "apollo-proto-jarombek" {
  statement {
    sid = "CloudfrontOAI"

    principals {
      identifiers = [aws_cloudfront_origin_access_identity.origin-access-identity.iam_arn]
      type = "AWS"
    }

    actions = ["s3:GetObject", "s3:ListBucket"]
    resources = [
      aws_s3_bucket.apollo-proto-jarombek.arn,
      "${aws_s3_bucket.apollo-proto-jarombek.arn}/*"
    ]
  }
}

resource "aws_s3_bucket_public_access_block" "apollo-proto-jarombek" {
  bucket = aws_s3_bucket.apollo-proto-jarombek.id

  block_public_acls = true
  block_public_policy = true
  restrict_public_buckets = true
  ignore_public_acls = true
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
