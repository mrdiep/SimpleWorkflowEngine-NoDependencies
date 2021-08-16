import { CheckBaseAbstract } from "./checkbase";

export class Check1 extends CheckBaseAbstract {
    run():Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}