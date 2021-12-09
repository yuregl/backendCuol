import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { ClientsController } from "../controllers/ClientController";
import { ClientsService } from "../services/ClientsServices";
import { ClientsRepositories } from "../repositories/ClientsRepositories";

import { CitiesService } from "../services/CitiesServices";
import { CitiesRepositories } from "../repositories/CitiesRepositories";

import {
  createClients,
  deleteClients,
  searchClientById,
  searchClientByName,
  updateNameClient,
} from "../validators/Clients/Clients";

const routesClient = Router();

function createClientRouter() {
  const citiesRepositories = getCustomRepository(CitiesRepositories);
  const citiesService = new CitiesService(citiesRepositories);

  const clientsRepositories = getCustomRepository(ClientsRepositories);
  const clientsService = new ClientsService(clientsRepositories, citiesService);
  const clientsController = new ClientsController(clientsService);

  routesClient.post(
    "/clients/new",
    createClients,
    clientsController.handleCreateClient
  );

  routesClient.get(
    "/clients/:id",
    searchClientById,
    clientsController.handleGetClientById
  );

  routesClient.get(
    "/clients?",
    searchClientByName,
    clientsController.handleGetClientByName
  );

  routesClient.patch(
    "/clients/update/:id",
    updateNameClient,
    clientsController.handleUpdateNameClient
  );

  routesClient.delete(
    "/clients/delete/:id",
    deleteClients,
    clientsController.handleDeleteClient
  );

  return routesClient;
}

export { createClientRouter };
