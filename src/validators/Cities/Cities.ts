import { body, param, query } from "express-validator";

const createCities = [
  body("city").isString().notEmpty().isLength({ min: 3, max: 60 }),
  body("state").isString().notEmpty().isLength({ min: 2, max: 2 }),
];

const getCityById = [param("id").notEmpty().isNumeric()];

const getCityByParams = [
  query("city").isEmpty().isLength({ min: 3, max: 60 }).optional(),
  query("state").isLength({ min: 2, max: 2 }).optional(),
];

export { createCities, getCityById, getCityByParams };
