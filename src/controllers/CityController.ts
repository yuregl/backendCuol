import { Request, Response } from "express";
import { CitiesService } from "../services/CitiesServices";
import { validationResult } from "express-validator";

type ObjQueryParams = {
  state?: string;
  city?: string;
};

class CitiesController {
  constructor(private cityService: CitiesService) {}

  handleCreateCity = async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { city, state } = request.body;
    await this.cityService.executeCreateCity({
      city,
      state,
    });

    return response.status(201).json({ message: "Criado com sucesso" });
  };

  handleGetCitiesByState = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const data: ObjQueryParams = {
      state: <string | undefined>request.query.state,
      city: <string | undefined>request.query.city,
    };

    Object.keys(data).forEach((key: keyof ObjQueryParams) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    const result = await this.cityService.getCities(data);

    return response.status(200).json(result);
  };

  handleGetCityById = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { id } = request.params;

    const result = await this.cityService.getCityById(parseInt(id));
    return response.status(200).json(result);
  };
}

export { CitiesController };
