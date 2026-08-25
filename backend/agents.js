import { AgentStatus, ReviewDecision } from './domain.js';

export class BaseAgent {
  constructor(definition, ai) { Object.assign(this, definition); this.ai = ai; this.status = AgentStatus.IDLE; this.currentTask = null; this.lastActivity = null; }
  canHandle(task) { return this.capabilities.some(c => `${task.title} ${task.description}`.toLowerCase().includes(c)); }
  async execute(task, context) { throw new Error('execute must be implemented'); }
}
export class ManagerAgent extends BaseAgent {
  async execute(task) { this.status=AgentStatus.WORKING; this.currentTask=task.id; return { type:'PLAN', goal:task.description, requestedAgents:['researcher','writer','reviewer'] }; }
}
export class ResearcherAgent extends BaseAgent {
  async execute(task) { this.status=AgentStatus.WORKING; this.currentTask=task.id; const result=await this.ai.generateText({prompt:`Research the topic and return structured findings: ${task.description}`}); return { findings:result.text }; }
}
export class WriterAgent extends BaseAgent {
  async execute(task, context={}) { this.status=AgentStatus.WORKING; this.currentTask=task.id; const result=await this.ai.generateText({prompt:`Write requested content using this context: ${JSON.stringify(context)}`}); return { draft:result.text }; }
}
export class ReviewerAgent extends BaseAgent {
  async execute(task) { this.status=AgentStatus.REVIEWING; this.currentTask=task.id; const text=JSON.stringify(task.input ?? task.output ?? ''); const approved=text.length > 10; return { decision:approved ? ReviewDecision.APPROVED : ReviewDecision.NEEDS_REVISION, issues:approved ? [] : ['Insufficient content for review'] }; }
}
