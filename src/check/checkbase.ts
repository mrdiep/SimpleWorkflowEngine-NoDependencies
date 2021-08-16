export abstract class CheckBaseAbstract {
    constructor(protected dependencies) {}
    abstract run(): Promise<boolean>;
}
