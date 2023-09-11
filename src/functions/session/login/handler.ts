import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { LoginUserController } from './LoginUserController';
import schema from './schema';
import * as dotenv from 'dotenv'

dotenv.config()

const userController = new LoginUserController()

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const { user, password } = event.body

  try {    
    const response = await userController.login(user, password)

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


export const main = middyfy(login);
