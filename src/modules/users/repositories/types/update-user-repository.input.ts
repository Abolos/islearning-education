import { Role, Status } from "src/generated/prisma";

export type UpdateUserRepositoryInput = {
    id: number;
    email?: string;
    passwordHash?: string;
    role?: Role;
    status?: Status;
}