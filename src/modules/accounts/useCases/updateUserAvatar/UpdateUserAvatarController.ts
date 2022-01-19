import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvataController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const avatarFile = req.file.filename;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        updateUserAvatarUseCase.execute({
            user_id: id,
            avatar_file: avatarFile,
        });

        return res.status(204).send();
    }
}

export { UpdateUserAvataController };
