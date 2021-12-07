import { Request, Response } from "express";
import { ClientsService } from "../services/ClientsServices";

class ClientsController {
  constructor(private clientService: ClientsService) {}

  handleCreateClient = async (request: Request, response: Response) => {
    const { full_name, gender, birth_date, cities_id } = request.body;
    try {
      const result = await this.clientService.executeCreateClient({
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
}

export { ClientsController };
