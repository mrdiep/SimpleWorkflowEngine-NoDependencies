import { createWorkflowEngine } from "container";
import YAML from 'yaml';
import fs from 'fs';
import { WorkflowSchema } from "models";

describe('test all', () => {
  it('test1', async () => {
    const schema = YAML.parse(fs.readFileSync('./schema/wf1.yml', 'utf-8')) as WorkflowSchema;
    const currentUserId = "1";
    const engine = createWorkflowEngine(schema, "1");
    
  })
});