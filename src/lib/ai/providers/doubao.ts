// 豆包 (Doubao) AI Provider - 字节跳动
import { AIProvider, ChatRequest, ChatResponse } from '../client';
import axios from 'axios';

export class DoubaoProvider implements AIProvider {
  name = '豆包 (Doubao)';
  private modelId: string;
  private apiKey: string;
  private endpoint: string;

  constructor(modelId: string, endpoint: string) {
    this.modelId = modelId;
    this.endpoint = endpoint;
    this.apiKey = process.env.DOUBAO_API_KEY || '';
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await axios.post(
      `${this.endpoint}/chat/completions`,
      {
        model: this.modelId,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2048
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = response.data;
    return {
      content: data.choices[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens
      }
    };
  }
}
