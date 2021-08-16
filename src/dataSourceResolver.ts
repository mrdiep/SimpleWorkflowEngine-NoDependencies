import uuid from 'uuid'
import { FormBody, RecordId } from "models";

export interface RecordInfo {
  workflowUniqueName: string;
  stateName: string;
  recordId: RecordId;
  formBody: FormBody;
}

export interface IDataSourceResolver {
  genId(): RecordId;
  getRecord(recordId: RecordId): Promise<RecordInfo>;
  pushRecord(recordInfo: RecordInfo): Promise<boolean>;
}

export class FakeDataSourceResolver implements IDataSourceResolver {
  genId(): RecordId {
    return uuid.v4();
  }

  records: RecordInfo[]
  async getRecord(recordId: RecordId): Promise<RecordInfo> {
    return this.records.find(x => x.recordId = recordId);
  }

  async pushRecord(recordInfo: RecordInfo): Promise<boolean> {
    this.records.push(recordInfo);
    return true;
  }

}