import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as dotenv from 'dotenv'
import { ForgotPasswordController } from './ForgotPasswordController';
import schema from './schema';

dotenv.config()

const userController = new ForgotPasswordController()

const forgotPassword: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const { mail } = event.body

  try {
    const response = await userController.forgotPassword(mail)

    return formatJSONResponse({
      response
    });

  } catch (err) {

    console.log(err)

    return formatJSONResponse({
      err
    });
  }
};


export const main = middyfy(forgotPassword);
