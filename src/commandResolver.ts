import {
  RecordId,
  UserIdType,
  WorkflowCommandSchema
} from "models";

export interface IWorkflowCommand {
  isAllow(): Promise<boolean>;
}

export interface ICommandResolver {
  resolve(actorDef: WorkflowCommandSchema, recordId: RecordId): Promise<IWorkflowCommand>;
}

export class CommandResolver implements ICommandResolver {
  constructor(protected currentUserId: UserIdType) {
  }

  async resolve(actorDef: WorkflowCommandSchema, recordId: RecordId): Promise<IWorkflowCommand> {
    return null;
  }
}

export abstract class WorkflowCommandAbstract<T> implements IWorkflowCommand {
  constructor(protected recordId: RecordId, protected currentUserId: UserIdType, protected def: T) {
  }

  async isAllow(): Promise<boolean> {
    return false;
  }
}

