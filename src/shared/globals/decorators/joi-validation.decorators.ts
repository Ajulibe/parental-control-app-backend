/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, NextFunction } from 'express';
import { JoiRequestValidationError } from '@global/helpers/error-handler';
import { ObjectSchema } from 'joi';

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

/**
 *
 * making use of typescript decorators here. the aim here is to
 * validate requests to ensure they conform to the schema
 *
 */

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  console.log('reached the joi');
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    //the function to be validated is contained in the value property of
    //the descriptor
    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const next: NextFunction = args[2];
      //validating the request body
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        return next(new JoiRequestValidationError(error.details[0].message));
      }
      //if there is no error, then set the arguments back to how they were
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
