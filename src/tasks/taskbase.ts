export abstract class TaskBaseAbstract {
    constructor(protected dependencies) {}
    abstract run();
}
