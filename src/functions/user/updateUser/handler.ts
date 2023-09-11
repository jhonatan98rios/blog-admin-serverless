import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { UpdateUserController } from './UpdateUserController';
import schema from './schema';
import * as dotenv from 'dotenv'

dotenv.config()

const userController = new UpdateUserController()

const updateUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const username = event.queryStringParameters.user
  const { currentPassword, password, passwordConfirmation } = event.body

  try {    
    const response = await userController.update({ username, currentPassword, password, passwordConfirmation })

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


export const main = middyfy(updateUser);
