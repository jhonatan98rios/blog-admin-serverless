import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { UpdateRoleUserController } from './UpdateRoleUserController';
import schema from './schema';
import * as dotenv from 'dotenv'

dotenv.config()

const userController = new UpdateRoleUserController()

const updateUserRole: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const username = event.queryStringParameters.user
  const { role } = event.body

  try {
    const response = await userController.updateRole({ username, role })

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

export const main = middyfy(updateUserRole);
