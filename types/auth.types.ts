import { Request } from "express";

export interface IAuthRequest extends Request{
    user?:{
        id:string,
        role:string,
        [key:string]:any
    }
} 