import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { CitiesController } from "../controllers/CityController";
import { CitiesService } from "../services/CitiesServices";
import { CitiesRepositories } from "../repositories/CitiesRepositories";

const routeCities = Router();

function createCitiesRouter() {
  const citiesRepositories = getCustomRepository(CitiesRepositories);
  const citiesService = new CitiesService(citiesRepositories);
  const citiesController = new CitiesController(citiesService);

  routeCities.post("/cities/new", citiesController.handleCreateCity);
  routeCities.get("/cities?", citiesController.handleGetCitiesByState);
  routeCities.get("/cities/:id", citiesController.handleGetCityById);

  return routeCities;
}

export { createCitiesRouter };
