export const TaskStatus = Object.freeze({ PENDING:'PENDING', ASSIGNED:'ASSIGNED', RUNNING:'RUNNING', WAITING:'WAITING', COMPLETED:'COMPLETED', FAILED:'FAILED', NEEDS_REVISION:'NEEDS_REVISION', CANCELLED:'CANCELLED' });
export const AgentStatus = Object.freeze({ IDLE:'IDLE', WORKING:'WORKING', WAITING:'WAITING', REVIEWING:'REVIEWING', COMPLETED:'COMPLETED', ERROR:'ERROR' });
export const Priority = Object.freeze({ LOW:'LOW', MEDIUM:'MEDIUM', HIGH:'HIGH', CRITICAL:'CRITICAL' });
export const ReviewDecision = Object.freeze({ APPROVED:'APPROVED', NEEDS_REVISION:'NEEDS_REVISION' });

export const agents = [
  { id:'manager', name:'Manager', role:'Orchestrator', description:'Understands goals, creates tasks, delegates and closes workflows.', capabilities:['planning','delegation','coordination'] },
  { id:'researcher', name:'Researcher', role:'Research', description:'Produces structured research for assigned topics.', capabilities:['research','synthesis'] },
  { id:'writer', name:'Writer', role:'Content Writer', description:'Turns context and research into requested content.', capabilities:['writing','revision'] },
  { id:'reviewer', name:'Reviewer', role:'Quality Assurance', description:'Checks completeness and quality and approves or requests revision.', capabilities:['review','quality'] }
];

export function createTask(input = {}) { return { id: input.id ?? crypto.randomUUID(), title: input.title ?? 'Untitled task', description: input.description ?? '', agentId: input.agentId ?? null, parentTaskId: input.parentTaskId ?? null, status: input.status ?? TaskStatus.PENDING, priority: input.priority ?? Priority.MEDIUM, input: input.input ?? null, output: input.output ?? null, createdAt: input.createdAt ?? new Date().toISOString(), startedAt:null, completedAt:null, error:null, retryCount:0 }; }
export function createWorkflow(goal) { return { id:crypto.randomUUID(), goal, status:TaskStatus.RUNNING, currentTaskId:null, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), completedAt:null, taskIds:[] }; }
export function createActivity(eventType, message, meta = {}) { return { id:crypto.randomUUID(), timestamp:new Date().toISOString(), workflowId:meta.workflowId ?? null, taskId:meta.taskId ?? null, agentId:meta.agentId ?? null, eventType, message, metadata:meta }; }
