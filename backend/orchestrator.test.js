import test from 'node:test';
import assert from 'node:assert/strict';
import { AiGateway } from './ai.js';
import { agents, TaskStatus, createTask } from './domain.js';
import { ManagerAgent, ResearcherAgent, WriterAgent, ReviewerAgent } from './agents.js';
import { Orchestrator } from './orchestrator.js';
function make(){const ai=new AiGateway();const map={manager:ManagerAgent,researcher:ResearcherAgent,writer:WriterAgent,reviewer:ReviewerAgent};return new Orchestrator(agents.map(d=>new map[d.id](d,ai)));}
test('manager creates and delegates task',()=>{const o=make();const w=o.startWorkflow('Create article about AI');const t=o.createTask(w.id,{title:'Research AI',description:'research ai automation',agentId:'researcher'});assert.equal(t.status,TaskStatus.PENDING);assert.equal(t.agentId,'researcher');assert.equal(w.taskIds.length,1);});
test('agent execution stores result and completes',async()=>{const o=make();const w=o.startWorkflow('research');const t=o.createTask(w.id,{title:'Research',description:'research topic',agentId:'researcher'});await o.execute(w.id,t.id);assert.equal(t.status,TaskStatus.COMPLETED);assert.ok(t.output);});
test('failed task can be retried',async()=>{const o=make();const w=o.startWorkflow('bad');const t=o.createTask(w.id,{title:'Missing',agentId:'unknown'});await assert.rejects(o.execute(w.id,t.id));assert.equal(t.status,TaskStatus.FAILED);o.retry(t.id);assert.equal(t.retryCount,1);assert.equal(t.status,TaskStatus.PENDING);});
test('reviewer approval and revision decisions',async()=>{const o=make();const w=o.startWorkflow('review');const good=o.createTask(w.id,{title:'Review',agentId:'reviewer',input:{draft:'This is sufficiently detailed content.'}});await o.execute(w.id,good.id);assert.equal(good.output.decision,'APPROVED');const bad=o.createTask(w.id,{title:'Review',agentId:'reviewer',input:{draft:''}});await o.execute(w.id,bad.id);assert.equal(bad.output.decision,'NEEDS_REVISION');});
test('workflow can complete',()=>{const o=make();const w=o.startWorkflow('done');const result=o.completeWorkflow(w.id);assert.equal(result.status,TaskStatus.COMPLETED);});
