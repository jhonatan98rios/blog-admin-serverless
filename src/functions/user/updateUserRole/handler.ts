import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { UpdateRoleUserController } from './UpdateRoleUserController';
import schema from './schema';
import Database from 'opt/nodejs/infra/data/database';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Database({
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASS!,
  collection: process.env.DATABASE_NAME!,
})

const userController = new UpdateRoleUserController()

const updateUserRole: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const username = event.queryStringParameters.user
  const { role } = event.body

  try {    
    await database.connect()

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
