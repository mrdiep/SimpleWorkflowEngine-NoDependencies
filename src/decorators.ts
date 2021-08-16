export const actor = (actorName: string) => {
    return <T extends { new(...args: any[]): {} }>(C: T) => {
        (<any>C).__actorName = actorName;

        return C;
    }
}