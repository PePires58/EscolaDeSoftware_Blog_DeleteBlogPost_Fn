## Escola de software - Blog - Dlete BlogPost - Lambda Function

This repository contains the lambda function to delete a blogpost.

The table already exists and the bucket to delete the object as well.

Don't forget, to be able to connect with S3 and DynamoDB the function will need two permissions.

- dynamodb:DeleteItem
- s3:DeleteObject

The dynamodb:PutItem is a custom manage policy, check it out at the BlogPost table repository [Click Here](https://github.com/PePires58/EscolaDeSoftware_Blog_BlogPost_Table).

S3 BlogContent Bucket is defined at this repository [Click Here](https://github.com/PePires58/EscolaDeSoftware_Blog_BlogPost_ContentBucket)

Thanks a lot
