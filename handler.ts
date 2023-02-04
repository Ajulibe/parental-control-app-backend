import { app } from './app';
import serverless from 'serverless-http';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const serverlessApp = serverless(app);
module.exports.api = async (event: APIGatewayProxyEvent, context: Context): Promise<any> => {
  try {
    const response = await serverlessApp(event, context);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
