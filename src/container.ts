import { ActorResolver, SpecificUsersActor, UserRolesActor } from 'actorResolver';
import * as awilix from 'awilix';
import { FakeDataSourceResolver } from 'dataSourceResolver';
import { UserIdType, WorkflowSchema } from 'models';
import { SimpleWorkflowEngine } from 'workflow';
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC
})

container.register(SimpleWorkflowEngine.name, awilix.asClass(SimpleWorkflowEngine).scoped());
container.register('dataSourceResolver', awilix.asClass(FakeDataSourceResolver).scoped());
container.register('actorResolver', awilix.asClass(ActorResolver).scoped());
// container.register('userRolesActor', awilix.asClass(UserRolesActor).scoped())
// container.register('specificUsersActor', awilix.asClass(SpecificUsersActor).scoped())


export type TypeCreateWorkflowEngineHandler = (workflowSchema: WorkflowSchema, currentUserId: UserIdType) => SimpleWorkflowEngine;
export const createWorkflowEngine: TypeCreateWorkflowEngineHandler = (workflowSchema, currentUserId) => {
    const scope = container.createScope();
    scope.register('workflowSchema', awilix.asValue(workflowSchema));
    scope.register('currentUserId', awilix.asValue(currentUserId));

    return scope.resolve(SimpleWorkflowEngine.name);

}

