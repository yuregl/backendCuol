import { Request, Response } from "express";
import { CitiesService } from "../services/CitiesServices";

type ObjQueryParams = {
  state?: string;
  city?: string;
};

class CitiesController {
  constructor(private cityService: CitiesService) {}

  handleCreateCity = async (request: Request, response: Response) => {
    const { city, state } = request.body;

    await this.cityService.executeCreateCity({
      city,
      state,
    });

    return response.status(201).json({ message: "Criado com sucesso" });
  };

  handleGetCitiesByState = async (request: Request, response: Response) => {
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
    const { id } = request.params;
    console.log("MZR", request.params);
    const result = await this.cityService.getCityById(parseInt(id));
    return response.status(200).json(result);
  };
}

export { CitiesController };
