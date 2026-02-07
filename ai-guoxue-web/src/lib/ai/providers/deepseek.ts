// DeepSeek AI Provider - 国产开源模型
import { AIProvider, ChatRequest, ChatResponse } from '../client';
import axios from 'axios';

export class DeepSeekProvider implements AIProvider {
  name = 'DeepSeek';
  private modelId: string;
  private apiKey: string;
  private endpoint = 'https://api.deepseek.com/v1';

  constructor(modelId: string) {
    this.modelId = modelId;
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await axios.post(
      `${this.endpoint}/chat/completions`,
      {
        model: this.modelId,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4096
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
