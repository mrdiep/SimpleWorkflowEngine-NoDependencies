//namespace SWF {
export type RecordId = string;
export type FormBody = Record<any, any>
export type UniqueName = string;
export type UserIdType = string;

export interface WorkflowSchema {
  uniqueName: string;
  actors: WorkflowActorSchema[];
  states: WorkflowStateSchema[];
}

export interface WorkflowActorSchema {
  name: string;
  type: 'UserRoles' | 'SpecificUsers' | 'FormBased' | 'NoAuthorized' | 'Custom'; // can custom more
  descriptions: string;
}

export interface WorkflowActorOperatorSchema {
  operator: 'AND' | 'OR' | 'NOT'
  list: WorkflowActorSchema[]
}

export interface ByUserRolesWorkflowActorSchema extends WorkflowActorSchema {
  roleNames: string[];
}

export interface BySpecificUsersWorkflowActorSchema extends WorkflowActorSchema {
  userIds: UserIdType[];
}

export interface ByFormBasedWorkflowActorSchema extends WorkflowActorSchema {
  expression: string;
  runtime: 'jmespath';// support jmesh only, can expand in futures 
}

export interface WorkflowStateSchema {
  uniqueName: UniqueName;
  type: 'begin' | 'end';
  actors: WorkflowActorOperatorSchema;
  controls: WorkflowControlSchema[];
  commands: WorkflowCommandSchema[];
}

export interface WorkflowControlSchema {
  type: 'textbox'
  uniqueName: UniqueName;
  displayText: string;
  require: boolean;
  formName: string;
  readonly?: boolean;
}

export interface WorkflowCommandSchema {
  uniqueName: UniqueName;
  displayText: string;
  nextState: string;
  actors: WorkflowActorOperatorSchema;
  tasks: WorkflowTaskSchema[];
}

export interface WorkflowTaskSchema {
  uniqueName: UniqueName;
  type: string;
  descriptions: string;
  emailTemplete: string;
}

//}
