import { Request, Response } from "express";
import moment from "moment";
import { ClientsService } from "../services/ClientsServices";

import { validationResult } from "express-validator";

moment().locale("pt-br");

class ClientsController {
  constructor(private clientService: ClientsService) {}

  handleCreateClient = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { full_name, gender, birth_date, cities_id } = request.body;

    await this.clientService.executeCreateClient({
      full_name,
      gender,
      birth_date,
      cities_id,
    });

    return response.status(201).json({ message: "Criado com sucesso" });
  };

  handleGetClientById = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { id } = request.params;
    const result = await this.clientService.executeGetClientById(parseInt(id));

    if (result.id) {
      const capitalizeName = result.capitalizeName(result.full_name);
      const year = result.birth_date.getFullYear();
      const age = result.getAge(year);
      return response
        .status(200)
        .json({ ...result, full_name: capitalizeName, age });
    } else {
      return response.status(404).json({ message: "Cliente não encontrado" });
    }
  };

  handleGetClientByName = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const name = request.query["full_name"]
      ? request.query["full_name"].toString()
      : undefined;

    if (name === undefined) {
      return response.status(400).json({ message: "Parametro name inválido" });
    }

    const full_name = name.replace(/_/g, " ");

    const result = await this.clientService.executeGetClientByName(full_name);
    if (result.id) {
      const capitalizeName = result.capitalizeName(result.full_name);
      const year = result.birth_date.getFullYear();
      const age = result.getAge(year);
      return response
        .status(200)
        .json({ ...result, full_name: capitalizeName, age });
    } else {
      return response.status(404).json({ message: "Cliente não encontrado" });
    }
  };

  handleUpdateNameClient = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { id } = request.params;
    const { full_name } = request.body;

    const result = await this.clientService.executeUpdateName(
      parseInt(id),
      full_name
    );

    const capitalizeName = result.capitalizeName(result.full_name);

    return response.status(200).json({ ...result, full_name: capitalizeName });
  };

  handleDeleteClient = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { id } = request.params;
    await this.clientService.executeDeleteClient(parseInt(id));
    return response.status(200).json({ message: "Deletado com sucessos" });
  };
}

export { ClientsController };
