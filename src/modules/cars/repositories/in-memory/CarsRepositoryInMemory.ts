import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        descritpion,
        daily_rate,
        license_plate,
        brand,
        category_id,
        fine_amount,
    }: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car, {
            name,
            descritpion,
            daily_rate,
            license_plate,
            brand,
            category_id,
            fine_amount,
        });

        this.cars.push(car);
    }
}

export { CarsRepositoryInMemory };
