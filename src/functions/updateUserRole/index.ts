import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'update-user-role',
        authorizer: {
          name: 'adminAuthorizer',
          resultTtlInSeconds: 3600
        },
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
