import { ActorResolver } from 'actorResolver';
import * as awilix from 'awilix';
import { FakeWorkflowInstanceDataSourceResolver } from 'resolvers/workflowInstanceDataSourceResolver';
import { UserIdType, WorkflowSchema } from 'models';
import { UserDataSourceResolver } from 'resolvers/userDataSourceResolver';
import { SimpleWorkflowEngine } from 'workflow';
import { CommandResolver } from 'commandResolver';
import { addDefault } from 'schema';
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

const camelCaseTransform = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

container.register(camelCaseTransform(SimpleWorkflowEngine.name), awilix.asClass(SimpleWorkflowEngine).scoped());
container.register(camelCaseTransform('WorkflowInstanceDataSourceResolver'), awilix.asClass(FakeWorkflowInstanceDataSourceResolver).scoped());
container.register(camelCaseTransform(UserDataSourceResolver.name), awilix.asClass(UserDataSourceResolver).scoped())

container.register(camelCaseTransform(ActorResolver.name), awilix.asClass(ActorResolver).scoped());
container.register(camelCaseTransform(CommandResolver.name), awilix.asClass(CommandResolver).scoped());


// container.register('userRolesActor', awilix.asClass(UserRolesActor).scoped())
// container.register('specificUsersActor', awilix.asClass(SpecificUsersActor).scoped())


export type TypeCreateWorkflowEngineHandler = (workflowSchema: WorkflowSchema, currentUserId: UserIdType) => SimpleWorkflowEngine;
export const createWorkflowEngine: TypeCreateWorkflowEngineHandler = (workflowSchema, currentUserId) => {
    const scope = container.createScope();
    scope.register('workflowSchema', awilix.asValue(addDefault(workflowSchema)));
    scope.register('currentUserId', awilix.asValue(currentUserId));

    return scope.resolve(camelCaseTransform(SimpleWorkflowEngine.name));

}

