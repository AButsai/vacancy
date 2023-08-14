import { Request } from 'express';

export type TUser = {
  email: string;
  id: string;
};
export interface MyRequest extends Request {
  user?: TUser;
}
