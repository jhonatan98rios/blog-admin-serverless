import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ResetPasswordUserController } from './ResetPasswordUserController';
import schema from './schema';
import * as dotenv from 'dotenv'

dotenv.config()


const userController = new ResetPasswordUserController()

const resetPassword: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const { mail, token, password, passwordConfirmation } = event.body

  try {    
    const response = await userController.resetPassword(mail, token, password, passwordConfirmation)

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


export const main = middyfy(resetPassword);
