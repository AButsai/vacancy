import { Request } from 'express';

export type TUser = {
  email: string;
  id: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
};
export interface MyRequest extends Request {
  user?: TUser;
}
