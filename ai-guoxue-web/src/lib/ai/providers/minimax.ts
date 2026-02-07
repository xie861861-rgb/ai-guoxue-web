// MiniMax AI Provider
import { AIProvider, ChatRequest, ChatResponse } from '../client';
import axios from 'axios';

interface MiniMaxMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MiniMaxRequest {
  model: string;
  messages: MiniMaxMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface MiniMaxResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class MinimaxProvider implements AIProvider {
  name = 'MiniMax';
  private modelId: string;
  private apiKey: string;
  private endpoint = 'https://api.minimax.chat/v1';

  constructor(modelId: string) {
    this.modelId = modelId;
    this.apiKey = process.env.MINIMAX_API_KEY || '';
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await axios.post<MiniMaxResponse>(
      `${this.endpoint}/text/chatcompletion_v2`,
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
