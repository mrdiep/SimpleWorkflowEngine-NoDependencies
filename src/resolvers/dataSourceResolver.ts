import uuid from 'uuid'
import { FormBody, RecordId } from "models";
import { IDataSourceResolver } from './resolverBase';

export interface RecordInfo {
  workflowUniqueName: string;
  stateName: string;
  recordId: RecordId;
  formBody: FormBody;
}

export interface IWorkflowInstanceDataSourceResolver extends IDataSourceResolver {
  genId(): RecordId;
  getRecord(recordId: RecordId): Promise<RecordInfo>;
  pushRecord(recordInfo: RecordInfo): Promise<boolean>;
}

/**
 * This is fake, we can connect to the real WorkflowInstace DataSource from any database like sqlserver or dynamodb...ect
 */
export class FakeWorkflowInstanceDataSourceResolver implements IWorkflowInstanceDataSourceResolver {
  records: RecordInfo[];
  
  genId(): RecordId {
    return uuid.v4();
  }

  async getRecord(recordId: RecordId): Promise<RecordInfo> {
    return this.records.find(x => x.recordId = recordId);
  }

  async pushRecord(recordInfo: RecordInfo): Promise<boolean> {
    this.records.push(recordInfo);
    return true;
  }

}