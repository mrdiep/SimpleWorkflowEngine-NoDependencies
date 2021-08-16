import { RecordId } from "models";

export interface IWorkflowObjectResolver<Template, TExecution> {
  resolve(template: Template, recordId: RecordId): Promise<TExecution>;
}

export interface IDataSourceResolver {

}