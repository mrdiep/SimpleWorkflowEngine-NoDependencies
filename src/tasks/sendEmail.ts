import { TaskBaseAbstract, TaskExecutionResult } from "./taskbase";

export class SendEmail extends TaskBaseAbstract {
    async run(): Promise<TaskExecutionResult> {
        console.log("SendEmail", this.dependencies)
        return TaskExecutionResult.Success();
    }
}