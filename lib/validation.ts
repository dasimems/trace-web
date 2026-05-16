import Joi from "joi";

import { UserCategories, UserGenders } from "@/lib/enum";

export const emailSchema = Joi.string()
  .trim()
  .lowercase()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email",
    "any.required": "Email is required",
  });

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const passwordSchema = Joi.string()
  .min(8)
  .pattern(passwordRegex)
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base":
      "Use 8+ chars with upper, lower, number and a special character",
    "any.required": "Password is required",
  });

const elevenDigit = /^\d{11}$/;

export const bvnSchema = Joi.string()
  .trim()
  .pattern(elevenDigit)
  .required()
  .messages({
    "string.empty": "BVN is required",
    "string.pattern.base": "BVN must be exactly 11 digits",
    "any.required": "BVN is required",
  });

export const ninSchema = Joi.string()
  .trim()
  .pattern(elevenDigit)
  .allow("")
  .optional()
  .messages({
    "string.pattern.base": "NIN must be exactly 11 digits",
  });

const e164 = /^\+\d{10,15}$/;

export const phoneNumberSchema = Joi.string()
  .trim()
  .pattern(e164)
  .required()
  .messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Use international format, e.g. +2348012345678",
    "any.required": "Phone number is required",
  });

const personName = (field: string) =>
  Joi.string()
    .trim()
    .min(2)
    .max(60)
    .pattern(/^[A-Za-z][A-Za-z'-]*(?: [A-Za-z'-]+)*$/)
    .required()
    .messages({
      "string.empty": `${field} is required`,
      "string.min": `${field} is too short`,
      "string.max": `${field} is too long`,
      "string.pattern.base": `${field} can only contain letters, hyphens and apostrophes`,
      "any.required": `${field} is required`,
    });

export const firstNameSchema = personName("First name");
export const lastNameSchema = personName("Last name");
export const middleNameSchema = personName("Middle name");

export const addressSchema = Joi.string()
  .trim()
  .min(4)
  .max(160)
  .required()
  .messages({
    "string.empty": "Address is required",
    "string.min": "Enter your full address",
    "string.max": "Address is too long",
    "any.required": "Address is required",
  });

const todayMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const dateOfBirthSchema = Joi.date()
  .iso()
  .less(todayMidnight())
  .required()
  .messages({
    "date.base": "Enter a valid date",
    "date.format": "Enter a valid date",
    "date.less": "Date of birth must be in the past",
    "any.required": "Date of birth is required",
  });

export const genderSchema = Joi.string()
  .valid(...Object.values(UserGenders))
  .required()
  .messages({
    "any.only": "Pick one",
    "any.required": "Pick one",
    "string.empty": "Pick one",
  });

export const categorySchema = Joi.string()
  .valid(...Object.values(UserCategories))
  .required()
  .messages({
    "any.only": "Pick what fits you best",
    "any.required": "Pick what fits you best",
    "string.empty": "Pick what fits you best",
  });

export const confirmPasswordSchema = Joi.any()
  .equal(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Passwords don't match",
    "any.required": "Confirm your password",
  });
