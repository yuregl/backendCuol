import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { CitiesController } from "../controllers/CityController";
import { CitiesService } from "../services/CitiesServices";
import { CitiesRepositories } from "../repositories/CitiesRepositories";
import {
  createCities,
  getCityById,
  getCityByParams,
} from "../validators/Cities/Cities";

const routeCities = Router();

function createCitiesRouter() {
  const citiesRepositories = getCustomRepository(CitiesRepositories);
  const citiesService = new CitiesService(citiesRepositories);
  const citiesController = new CitiesController(citiesService);

  routeCities.post(
    "/cities/new",
    createCities,
    citiesController.handleCreateCity
  );

  routeCities.get(
    "/cities?",
    getCityByParams,
    citiesController.handleGetCitiesByState
  );

  routeCities.get(
    "/cities/:id",
    getCityById,
    citiesController.handleGetCityById
  );

  return routeCities;
}

export { createCitiesRouter };
