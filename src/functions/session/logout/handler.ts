import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { LogoutUserController } from './LogoutUserController';
import * as dotenv from 'dotenv'

dotenv.config()

const userController = new LogoutUserController()

const logout = async (event) => { 
  try {    
    const response = await userController.logout(event.queryStringParameters.user)
    return formatJSONResponse({
      response
    });

  } catch (err) {

    console.log(err)

    return formatJSONResponse({
      err
    });

  }
}


export const main = middyfy(logout);
