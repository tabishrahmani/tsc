import Joi, { Schema, ValidationResult } from "joi";
import { IUser } from "./user.interface";

export function createUserSchema(payload: IUser): ValidationResult {
  const schema: Schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).required(),
    phoneNumber: Joi.object({
      countryCode: Joi.string()
        .required()
        .pattern(/^\+/, "countryCode")
        .message("phoneNumber.countryCode should start with + symbol"),
      mobileNumber: Joi.string().required(),
    })
      .required()
      .custom((value, helpers) => {
        if ((value.countryCode + value.mobileNumber).length !== 13) {
          // return helpers.error("Invalid Phone Number");
          throw new Error("Length is invalid");
        }
        return value;
      }),
  });
  return schema.validate(payload);
}
