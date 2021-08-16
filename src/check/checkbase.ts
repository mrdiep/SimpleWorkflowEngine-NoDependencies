export class CheckExecutionResult {
    constructor(protected _isAllow: boolean, message: string = '') { }

    isAllow() {
        return this._isAllow
    }

    static Allow = (message: string = ''): CheckExecutionResult => new CheckExecutionResult(true, message);
    static Disallow = (message: string = ''): CheckExecutionResult => new CheckExecutionResult(false, message);
}

export abstract class CheckBaseAbstract {
    constructor(protected dependencies) { }
    abstract check(): Promise<CheckExecutionResult>;
}
