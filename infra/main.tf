/**
 * Infrastructure for the Apollo Client Server Prototype.
 * Author: Andrew Jarombek
 * Date: 5/17/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
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

#--------------------------------------
# New AWS Resources for S3 & CloudFront
#--------------------------------------

resource "aws_s3_bucket" "apollo-proto-jarombek" {
  bucket = "apollo.proto.jarombek.com"
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
