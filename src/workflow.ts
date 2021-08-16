import { IActorResolver } from "actorResolver";
import { ICommandResolver } from "commandResolver";
import { IDataSourceResolver } from "dataSourceResolver";
import { FormBody, RecordId, UserIdType, WorkflowCommandSchema, WorkflowSchema, WorkflowStateSchema } from "models";

export class WorkflowExecutionResult {
  constructor(status: boolean, message: string) { }
}

export interface ISimpleWorkflowEngine {
  init(initBody: FormBody): Promise<WorkflowExecutionResult>;
  getCurrentState(recordId: RecordId): Promise<WorkflowStateSchema>;
  getAvaiableCommands(recordId: RecordId): Promise<WorkflowCommandSchema[]>;
  executeCommand(recordId: RecordId, payload: FormBody): Promise<WorkflowExecutionResult>;
}

export class SimpleWorkflowEngine implements ISimpleWorkflowEngine {
  constructor(
    private schema: WorkflowSchema,
    private currentUserId: UserIdType,
    private dataSourceResolver: IDataSourceResolver,
    private commandResolver: ICommandResolver,
    private actorResolver: IActorResolver) {

  }

  async init(initBody: FormBody): Promise<WorkflowExecutionResult> {
    const beginState = this.schema.states.find(x => x.type == 'begin');
    this.dataSourceResolver.pushRecord({
      recordId: this.dataSourceResolver.genId(),
      formBody: initBody,
      stateName: beginState.uniqueName,
      workflowUniqueName: this.schema.uniqueName
    });

    return new WorkflowExecutionResult(true, 'init workflow success');
  }

  async getCurrentState(recordId: RecordId): Promise<WorkflowStateSchema> {
    const recordInfo = await this.dataSourceResolver.getRecord(recordId);
    if (!recordInfo) return null;
    const stateDefinition = this.schema.states.find(x => x.uniqueName = recordInfo.stateName);

    const actors = await Promise.all(stateDefinition.actors.map(async actorDef => this.actorResolver.resolve(actorDef, recordId)));
    const commands = await Promise.all(stateDefinition.commands.map(async commandDef => this.commandResolver.resolve(commandDef, recordId)));

    return stateDefinition;
  }

  async getAvaiableCommands(recordId: RecordId): Promise<WorkflowCommandSchema[]> {
    return [];
  }

  async executeCommand(recordId: RecordId, payload: FormBody): Promise<WorkflowExecutionResult> {
    return null;
  }

}
