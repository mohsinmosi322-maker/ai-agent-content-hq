export class AiProviderError extends Error {}
export class AiGateway {
  constructor(provider = new DeterministicProvider()) { this.provider = provider; }
  generateText(request) { return this.provider.generateText(request); }
  analyze(request) { return this.provider.analyze(request); }
  structuredOutput(request) { return this.provider.structuredOutput(request); }
}

export class DeterministicProvider {
  async generateText({ prompt = '' } = {}) { return { text:`Provider-ready placeholder response for: ${prompt}`, provider:'deterministic' }; }
  async analyze({ input = '' } = {}) { return { analysis: input ? 'Input accepted for analysis.' : 'No input supplied.', provider:'deterministic' }; }
  async structuredOutput({ input = '', schema = {} } = {}) { return { data:{ input, schema }, provider:'deterministic' }; }
}
