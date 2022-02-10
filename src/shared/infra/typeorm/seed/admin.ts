import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const conn = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    await conn.query(`insert into users (id,name,email,password,"isAdmin",created_at,driver_license) 
    values('${id}','admin','admin@rentalx.com.br','${password}',true,'now()','B')
    `);

    await conn.close;
}
create().then(() => console.log("User admin created"));
