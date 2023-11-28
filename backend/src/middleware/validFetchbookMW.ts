import { Request, Response, NextFunction } from 'express';
import {ValidationSchema} from '../validations/interface'

const validFetchBookMW = (schema: ValidationSchema) => async(req: Request, res: Response, next: NextFunction) => {
  const { limit, page } = req.body;
  try{
    await schema.validate({ limit, page })
    return next()
  }
  catch(error: any){
    return res
    .status(400)
    .json({ error: error.message || "An error occurred during fetch books validation" });
  }
}
export default validFetchBookMW;