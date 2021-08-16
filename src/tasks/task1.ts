import { TaskBaseAbstract, TaskExecutionResult } from "./taskbase";

export class Task1 extends TaskBaseAbstract {
    async run(): Promise<TaskExecutionResult> {
        console.log("Simple task 1", this.dependencies)
        return TaskExecutionResult.Success();
    }

}