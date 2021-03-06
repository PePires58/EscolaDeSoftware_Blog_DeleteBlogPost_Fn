let response;

const dynamodbService = require('./services/dynamodbService');
const s3Service = require('./services/s3Service');

exports.lambdaHandler = async (event, context) => {
    try {
        const parametersDynamo = {
            Hash: event.headers["id"],
            Range: event.queryStringParameters.title
        }
        const dynamoDbItem = await dynamodbService.GetBlogPostByKey(parametersDynamo);

        Promise.all([
            await dynamodbService.DeleteBlogPost(parametersDynamo),
            await s3Service.DeleteObject(dynamoDbItem.content_bucket_key.S)
        ]);

        response = {
            'statusCode': 200,
            'isBase64Encoded': false,
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify({ error: err }),
            'isBase64Encoded': false,
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    }

    return response
};