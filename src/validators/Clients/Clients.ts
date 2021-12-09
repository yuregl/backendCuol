import { body, param, query } from "express-validator";

const createClients = [
  body("full_name").isString().isLength({ min: 8, max: 60 }),
  body("gender").isString(),
  body("birth_date").isDate(),
  body("cities_id").isNumeric(),
];

const searchClientById = [param("id").notEmpty().isNumeric()];

const deleteClients = [param("id").notEmpty().isNumeric()];

const searchClientByName = [query("full_name").isLength({ min: 8, max: 60 })];

const updateNameClient = [
  param("id").notEmpty().isNumeric(),
  body("full_name").isLength({ min: 8, max: 60 }),
];

export {
  createClients,
  deleteClients,
  searchClientById,
  searchClientByName,
  updateNameClient,
};
