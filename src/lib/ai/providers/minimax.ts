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
    try {
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
      
      // 检查响应数据是否有效
      if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
        console.error('MiniMax API 返回无效数据:', data);
        throw new Error('AI 服务返回无效响应');
      }
      
      const choice = data.choices[0];
      if (!choice.message) {
        console.error('MiniMax API 返回无效消息:', choice);
        throw new Error('AI 服务返回无效消息');
      }
      
      return {
        content: choice.message.content || '',
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        }
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('MiniMax API 错误:', error.response?.data || error.message);
        throw new Error(`AI 服务错误: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}
