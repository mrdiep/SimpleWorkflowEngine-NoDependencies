export class TaskExecutionResult {
    constructor(success: boolean, message: string = '') { }

    static Success = (message: string = '') : TaskExecutionResult => new TaskExecutionResult(true, message);
    static Fail = (message: string = '') : TaskExecutionResult => new TaskExecutionResult(false, message);

}

export abstract class TaskBaseAbstract {
    constructor(protected dependencies) { }
    abstract run(): Promise<TaskExecutionResult>;
}
