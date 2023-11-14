import { Request, Response, NextFunction } from 'express';
import {ValidationSchema} from '../validations/interface'

const validationMW = (schema: ValidationSchema) => async(req: Request, res: Response, next: NextFunction) => {
  const { title, ageGroup, subject, characters, lesson, page, privacy } = req.body;
  try{
    await schema.validate({ title, ageGroup, subject, characters, lesson, page, privacy })
    return next()
  }
  catch(error: any){
    return res
    .status(400)
    .json({ error: error.message || "An error occurred during validation" });
  }
}
export default validationMW;