import { LoginPaylodDto } from '../auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  auth: string,
): LoginPaylodDto | undefined => {
  const authSplit = auth.split('.');

  if (!authSplit[1] || authSplit.length < 3) {
    return undefined;
  }

  return JSON.parse(Buffer.from(authSplit[1], 'base64').toString('ascii'));
};
