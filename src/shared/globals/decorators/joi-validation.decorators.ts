/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, NextFunction } from 'express';
import { JoiRequestValidationError } from '@global/helpers/error-handler';
import { ArraySchema, ObjectSchema } from 'joi';

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

/**
 *
 * making use of typescript decorators here. the aim here is to
 * validate requests to ensure they conform to the schema
 *
 */

/*=============================================
=            Refactored to handle Arry of objects and objects            =
=============================================*/

export function joiValidation(schema: ObjectSchema | ArraySchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const next: NextFunction = args[2];

      if (Array.isArray(req.body)) {
        //validate each entry in the object
        req.body.map(async (item) => {
          const { error } = await Promise.resolve(schema.validate(item));
          if (error?.details) {
            return next(new JoiRequestValidationError(error.details[0].message));
          }
        });
      } else {
        const { error } = await Promise.resolve(schema.validate(req.body));
        if (error?.details) {
          return next(new JoiRequestValidationError(error.details[0].message));
        }
      }

      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
