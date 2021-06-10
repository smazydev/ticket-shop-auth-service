import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/users";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();
router.post(
  "/api/users/signup",
  [
    //Email and Password Validation Middleware
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    
    //Extract email and password from the body of the request
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    //Check if user email already exists
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }
    
    //Create a new user and save it to the database
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    },process.env.JWT_KEY!)
    
    //Store it on the session object
    req.session = {
      jwt: userJwt
    };

    //201 Created Response and send the user object back to the user.
    res.status(201).send(user);
  }
);

export { router as signUpRouter };
