import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "667878",
            email: "teste@teste.com",
            name: "teste teste",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("teste@teste.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot password mail if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("jhfksd@kjlakdj.com")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "7655",
            email: "email@teste.com",
            name: "emai teste",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("email@teste.com");

        expect(generateTokenMail).toBeCalled();
    });
});
