import { CheckBaseAbstract, CheckExecutionResult } from "./checkbase";

export class Check1 extends CheckBaseAbstract {
    async check():Promise<CheckExecutionResult> {
        console.log('check task number 1', this.dependencies)
        return CheckExecutionResult.Allow();
    }
}