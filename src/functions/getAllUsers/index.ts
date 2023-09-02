import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'users',
        authorizer: {
          name: 'validate',
          resultTtlInSeconds: 3600
        }
      },
    },
  ],
};
