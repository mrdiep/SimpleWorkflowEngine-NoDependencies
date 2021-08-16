import { actor } from "decorators";
import { WorkflowSchema } from "models";

export function addDefault(schema: WorkflowSchema) {
    for(const state of schema.states) {
        state.commands = state.commands || [];
    }

    const raw_actors = schema.actors as any;
    schema.actors = Object.keys(raw_actors).map(x => {
        const actor = raw_actors[x];
        actor.name = x;
        return actor;
    })

    return schema;
}