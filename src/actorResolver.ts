import {
  BySpecificUsersWorkflowActorSchema,
  ByUserRolesWorkflowActorSchema,
  RecordId,
  UserIdType,
  WorkflowActorSchema,
  WorkflowStateSchema
} from "models";

export interface IWorkflowActor {
  isAllow(): Promise<boolean>;
}

export interface IActorResolver {
  resolve(actorDef: WorkflowActorSchema, recordId: RecordId): Promise<IWorkflowActor>;
}

export class ActorResolver implements IActorResolver {
  constructor(protected currentUserId: UserIdType) {
  }

  async resolve(actorDef: WorkflowActorSchema, recordId: RecordId): Promise<IWorkflowActor> {
    if (actorDef.type == 'UserRole') {
      return (new UserRolesActor(recordId, this.currentUserId, actorDef as ByUserRolesWorkflowActorSchema));
    }

    if (actorDef.type == 'SpecificUsers') {
      return (new SpecificUsersActor(recordId, this.currentUserId, actorDef as BySpecificUsersWorkflowActorSchema));
    }

    return null;
  }
}

export abstract class WorkflowActorAbstract<T> implements IWorkflowActor {
  constructor(protected recordId: RecordId, protected currentUserId: UserIdType, protected def: T) {
  }

  async isAllow(): Promise<boolean> {
    return false;
  }


}

export class UserRolesActor extends WorkflowActorAbstract<ByUserRolesWorkflowActorSchema> {
  async isAllow(): Promise<boolean> {
    // check the current user is has role in roleNames
    //console.log(this.def.roleNames);

    return true;
  }
}

export class SpecificUsersActor extends WorkflowActorAbstract<BySpecificUsersWorkflowActorSchema> {
  async isAllow(): Promise<boolean> {
    return true;
  }
}
