import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(`insert into users (id,name,email,password,"isAdmin",created_at,driver_license) 
        values('${id}','admin','admin@rentalx.com.br','${password}',true,'now()','B')
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Esportivo",
                description: "Categoria para carros espoortivos",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toEqual(201);
    });

    it("Should not be able to create a new category with same name", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Esportivo",
                description: "Categoria para carros espoortivos",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toEqual(400);
    });
});
