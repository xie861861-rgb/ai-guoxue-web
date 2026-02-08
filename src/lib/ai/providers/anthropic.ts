// Anthropic Provider - Claude 系列模型
import { AIProvider, ChatRequest, ChatResponse } from '../client';
import Anthropic from '@anthropic-ai/sdk';

export class AnthropicProvider implements AIProvider {
  name = 'Anthropic';
  private client: Anthropic;
  private modelId: string;

  constructor(modelId: string) {
    this.modelId = modelId;
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || ''
    });
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await this.client.messages.create({
      model: this.modelId,
      max_tokens: request.maxTokens ?? 4096,
      messages: request.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    });

    const usage = response.usage;
    const contentBlock = response.content[0];
    const content = contentBlock && 'text' in contentBlock ? contentBlock.text : '';
    return {
      content,
      usage: {
        promptTokens: usage.input_tokens,
        completionTokens: usage.output_tokens,
        totalTokens: usage.input_tokens + usage.output_tokens
      }
    };
  }
}
