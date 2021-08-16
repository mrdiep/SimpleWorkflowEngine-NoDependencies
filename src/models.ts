//namespace SWF {
export type RecordId = string;
export type FormBody = Record<any, any>
export type UniqueName = string;
export type UserIdType = string;

export interface WorkflowSchema {
  uniqueName: string;
  states: WorkflowStateSchema[];
}

export interface WorkflowActorSchema {
  type: 'UserRole' | 'SpecificUsers'; // can custom more
  descriptions: string;
}

export interface ByUserRolesWorkflowActorSchema extends WorkflowActorSchema {
  roleNames: string[];
}

export interface BySpecificUsersWorkflowActorSchema extends WorkflowActorSchema {
  userIds: UserIdType[];
}


export interface WorkflowStateSchema {
  uniqueName: UniqueName;
  type: 'begin' | 'end';
  actors: WorkflowActorSchema[];
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
  tasks: WorkflowTaskSchema[];
}

export interface WorkflowTaskSchema {
  uniqueName: UniqueName;
  type: string;
  descriptions: string;
  emailTemplete: string;
}

//}
