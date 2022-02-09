import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createCarConroller = new CreateCarController();

carsRoutes.post("/", createCarConroller.handle);

export { carsRoutes };
