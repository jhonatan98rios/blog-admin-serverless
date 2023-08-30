import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const healthCheck = async () => {
  return formatJSONResponse({
    status: 200,
  });
};


export const main = middyfy(healthCheck);
