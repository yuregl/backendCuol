import { Request, Response } from "express";
import moment from "moment";
import { ClientsService } from "../services/ClientsServices";

moment().locale("pt-br");

class ClientsController {
  constructor(private clientService: ClientsService) {}

  handleCreateClient = async (request: Request, response: Response) => {
    const { full_name, gender, birth_date, cities_id } = request.body;
    try {
      await this.clientService.executeCreateClient({
        full_name,
        gender,
        birth_date,
        cities_id,
      });

      return response.status(201).json({ message: "Criado com sucesso" });
    } catch (error) {
      return response.status(500).json({ message: `${error}` });
    }
  };

  handleGetClientById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await this.clientService.executeGetClientById(parseInt(id));

    if (result.id) {
      const capitalizeName = result.capitalizeName(result.full_name);
      const year = result.birth_date.getFullYear();
      const value = moment().subtract(year, "years").calendar();
      const [, age] = value.split("/00");
      return response
        .status(200)
        .json({ ...result, full_name: capitalizeName, age });
    } else {
      return response.status(404).json({ message: "Cliente não encontrado" });
    }
  };

  handleGetClientByName = async (request: Request, response: Response) => {
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
}

export { ClientsController };
