import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import ensureAdmin from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarConroller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarConroller.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
