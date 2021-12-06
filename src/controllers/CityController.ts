import { Request, Response } from "express";
import { CitiesService } from "../services/CitiesServices";

class CitiesController {
  constructor(private cityService: CitiesService) {}

  handleCreateCity = async (request: Request, response: Response) => {
    const { city, state } = request.body;

    try {
      await this.cityService.executeCreateCity({
        city,
        state,
      });

      return response.status(201).json({ message: "Criado com sucesso" });
    } catch (error) {
      return response.status(409).json({ message: `${error}` });
    }
  };
}

export { CitiesController };
