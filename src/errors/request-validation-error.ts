import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();
        
        //Only because we are using TS and extending a builtin Class
        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }
}
