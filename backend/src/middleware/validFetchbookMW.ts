import { Request, Response, NextFunction } from 'express';
import {ValidationSchema} from '../validations/interface'

const validFetchBookMW = (schema: ValidationSchema) => async(req: Request, res: Response, next: NextFunction) => {
  const { page, limit, search } = req.query;
  try{
    await schema.validate({ page, limit, search })
    return next()
  }
  catch(error: any){
    return res
    .status(400)
    .json({ error: error.message || "An error occurred during fetch books validation" });
  }
}
export default validFetchBookMW;