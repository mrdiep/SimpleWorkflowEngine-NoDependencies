import { IActorResolver } from "actorResolver";
import { ICommandResolver } from "commandResolver";
import { FormBody, RecordId, UserIdType, WorkflowCommandSchema, WorkflowSchema, WorkflowStateSchema } from "models";
import { IWorkflowInstanceDataSourceResolver } from "resolvers/workflowInstanceDataSourceResolver";

export class WorkflowExecutionResult {
  constructor(status: boolean, message: string) { }

  recordId: RecordId;
}

export interface ISimpleWorkflowEngine {
  init(initBody: FormBody): Promise<WorkflowExecutionResult>;
  getCurrentState(recordId: RecordId): Promise<WorkflowStateSchema>;
  getAvaiableCommands(recordId: RecordId): Promise<WorkflowCommandSchema[]>;
  executeCommand(recordId: RecordId, payload: FormBody): Promise<WorkflowExecutionResult>;
}

export class SimpleWorkflowEngine implements ISimpleWorkflowEngine {
  constructor(dependencies) {
    console.log(dependencies);
    this.workflowSchema = dependencies.workflowSchema;
    this.currentUserId = dependencies.currentUserId;
    this.workflowInstanceDataSourceResolver = dependencies.workflowInstanceDataSourceResolver;
    this.commandResolver = dependencies.commandResolver;
    this.actorResolver = dependencies.actorResolver;
  }

  protected workflowSchema: WorkflowSchema;
  protected currentUserId: UserIdType;
  protected workflowInstanceDataSourceResolver: IWorkflowInstanceDataSourceResolver;
  protected commandResolver: ICommandResolver;
  protected actorResolver: IActorResolver;

  async init(initBody: FormBody): Promise<WorkflowExecutionResult> {
    const beginState = this.workflowSchema.states.find(x => x.type == 'begin');
    const recordId: RecordId = await this.workflowInstanceDataSourceResolver.pushRecord({
      recordId: this.workflowInstanceDataSourceResolver.genId(),
      formBody: initBody,
      stateName: beginState.uniqueName,
      workflowUniqueName: this.workflowSchema.uniqueName
    });

    const result = new WorkflowExecutionResult(true, 'init workflow success');
    result.recordId = recordId;

    return result;
  }

  async getCurrentState(recordId: RecordId): Promise<WorkflowStateSchema> {
    const recordInfo = await this.workflowInstanceDataSourceResolver.getRecord(recordId);
    if (!recordInfo) return null;
    const stateDefinition = this.workflowSchema.states.find(x => x.uniqueName = recordInfo.stateName);

    const actors = await Promise.all(stateDefinition.actors?.list?.map(async actorDef => this.actorResolver.resolve(actorDef, recordId)) ?? []);
    // still support AND operator
    const commands = await Promise.all(stateDefinition.commands?.map(async commandDef => this.commandResolver.resolve(commandDef, recordId)) ?? []);

    return stateDefinition;
  }

  async getAvaiableCommands(recordId: RecordId): Promise<WorkflowCommandSchema[]> {
    return [];
  }

  async executeCommand(recordId: RecordId, payload: FormBody): Promise<WorkflowExecutionResult> {
    return null;
  }

}
