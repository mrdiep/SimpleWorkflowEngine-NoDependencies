import { UserIdType } from "models";
import { IDataSourceResolver } from "./resolverBase";

export type UserRoleType = {
    roleName: string;
}

export class UserDataSourceResolver implements IDataSourceResolver {
    constructor(protected depedencies) { }

    getUserRoles(userId: UserIdType): UserRoleType[] {
        return [];
    }
} 