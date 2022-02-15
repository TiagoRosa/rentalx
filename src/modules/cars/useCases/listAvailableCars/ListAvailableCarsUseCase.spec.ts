import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all availables cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "car description",
            daily_rate: 500,
            license_plate: "abd-2201",
            fine_amount: 300,
            brand: "car_brand",
            category_id: "category id",
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all availables cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "car description2",
            daily_rate: 500,
            license_plate: "abd-2201",
            fine_amount: 300,
            brand: "car_brand_test",
            category_id: "category id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "car_brand_test",
        });
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all availables cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "car description3",
            daily_rate: 500,
            license_plate: "abd-2201",
            fine_amount: 300,
            brand: "car_brand_test",
            category_id: "category id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all availables cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "car description4",
            daily_rate: 500,
            license_plate: "abd-2201",
            fine_amount: 300,
            brand: "car_brand_test",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
        expect(cars).toEqual([car]);
    });
});
