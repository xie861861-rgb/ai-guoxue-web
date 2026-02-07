// OpenAI Provider - GPT 系列模型
import OpenAI from 'openai';
import { AIProvider, ChatRequest, ChatResponse } from '../client';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  private client: OpenAI;
  private modelId: string;

  constructor(modelId: string) {
    this.modelId = modelId;
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
      baseURL: process.env.OPENAI_BASE_URL
    });
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await this.client.chat.completions.create({
      model: this.modelId,
      messages: request.messages as OpenAI.Chat.ChatCompletionMessageParam[],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2048,
      stream: false
    });

    return {
      content: response.choices[0]?.message?.content || '',
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0
      }
    };
  }
}
