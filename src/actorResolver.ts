import {
  BySpecificUsersWorkflowActorSchema,
  ByUserRolesWorkflowActorSchema,
  RecordId,
  UserIdType,
  WorkflowActorSchema
} from "models";

export interface IWorkflowActor {
  isAllow(): Promise<boolean>;
}

export interface IActorResolver {
  resolve(actorDef: WorkflowActorSchema, recordId: RecordId): Promise<IWorkflowActor>;
}

export class ActorResolver implements IActorResolver {
  constructor(protected dependencies) {
  }

  async resolve(actorDef: WorkflowActorSchema, recordId: RecordId): Promise<IWorkflowActor> {
    if (actorDef.type == 'UserRoles') {
      return (new UserRolesActor(this.dependencies, recordId, actorDef as ByUserRolesWorkflowActorSchema));
    }

    if (actorDef.type == 'SpecificUsers') {
      return (new SpecificUsersActor(this.dependencies, recordId, actorDef as BySpecificUsersWorkflowActorSchema));
    }

    if (actorDef.type == 'FormBased') {
      return (new SpecificUsersActor(this.dependencies, recordId, actorDef as BySpecificUsersWorkflowActorSchema));
    }
    
    if (actorDef.type == 'NoAuthorized') {
      return (new SpecificUsersActor(this.dependencies, recordId, actorDef as BySpecificUsersWorkflowActorSchema));
    }

    return null;
  }
}

export abstract class WorkflowActorAbstract<T> implements IWorkflowActor {
  constructor(protected dependencies, protected recordId: RecordId, protected def: T) {
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

export class FormBasedActor extends WorkflowActorAbstract<BySpecificUsersWorkflowActorSchema> {

}


export class NoAuthorizedActor extends WorkflowActorAbstract<null> {
  async isAllow(): Promise<boolean> {
    return true;
  }
}