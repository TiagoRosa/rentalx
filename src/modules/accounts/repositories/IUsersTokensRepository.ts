import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
    create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
