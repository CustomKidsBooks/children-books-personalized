import { Request, Response, NextFunction } from 'express';
import { ValidationSchema } from '../validations/interface';

const genericValidationMW = (schema: ValidationSchema, source: 'body' | 'query') => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = source === 'body' ? req.body : req.query;
    await schema.validate(data);
  } catch (error: any) {
    return res
      .status(400)
      .json({ error: error.message || `An error occurred during ${source === 'body' ? 'body validation' : 'query validation'}` });
  }
  return next();
};

export default genericValidationMW;
