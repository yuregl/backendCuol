import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { ClientsController } from "../controllers/ClientController";
import { ClientsService } from "../services/ClientsServices";
import { ClientsRepositories } from "../repositories/ClientsRepositories";

import { CitiesService } from "../services/CitiesServices";
import { CitiesRepositories } from "../repositories/CitiesRepositories";

const routesClient = Router();

function createClientRouter() {
  const citiesRepositories = getCustomRepository(CitiesRepositories);
  const citiesService = new CitiesService(citiesRepositories);

  const clientsRepositories = getCustomRepository(ClientsRepositories);
  const clientsService = new ClientsService(clientsRepositories, citiesService);
  const clientsController = new ClientsController(clientsService);

  routesClient.post("/clients/new", clientsController.handleCreateClient);
  routesClient.get("/clients/:id", clientsController.handleGetClientById);
  routesClient.get("/clients?", clientsController.handleGetClientByName);

  return routesClient;
}

export { createClientRouter };
