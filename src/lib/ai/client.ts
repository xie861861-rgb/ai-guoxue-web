// 统一 AI 客户端接口
import { ModelConfig, AVAILABLE_MODELS } from '../config/models';

// 消息类型
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  modelId: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// AI Provider 接口
export interface AIProvider {
  name: string;
  chat(request: ChatRequest): Promise<ChatResponse>;
  streamChat?(request: ChatRequest): AsyncGenerator<string>;
}

// 统一客户端
export class UnifiedAIClient {
  private providers: Map<string, AIProvider> = new Map();

  constructor() {
    // 注册所有提供商
    // 这里会动态导入各个提供商的实现
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const modelConfig = AVAILABLE_MODELS.find(m => m.id === request.modelId);
    
    if (!modelConfig) {
      throw new Error(`Unknown model: ${request.modelId}`);
    }

    const provider = this.getProvider(modelConfig.provider);
    return provider.chat(request);
  }

  private getProvider(providerName: string): AIProvider {
    // 动态加载提供商实现
    // 目前返回 MiniMax 作为默认
    return this.providers.get(providerName) || this.providers.get('minimax')!;
  }

  // 注册自定义提供商
  registerProvider(name: string, provider: AIProvider) {
    this.providers.set(name, provider);
  }
}

// 工厂函数：创建指定模型的客户端
export async function createAIClient(modelId: string): Promise<AIProvider> {
  const modelConfig = AVAILABLE_MODELS.find(m => m.id === modelId);
  
  if (!modelConfig) {
    throw new Error(`Unknown model: ${modelId}`);
  }

  switch (modelConfig.provider) {
    case 'minimax':
      const { MinimaxProvider } = await import('./minimax/provider');
      return new MinimaxProvider(modelConfig.modelId);
    
    case 'doubao':
      const { DoubaoProvider } = await import('./doubao/provider');
      return new DoubaoProvider(modelConfig.modelId, modelConfig.endpoint!);
    
    case 'deepseek':
      const { DeepSeekProvider } = await import('./deepseek/provider');
      return new DeepSeekProvider(modelConfig.modelId);
    
    case 'openai':
      const { OpenAIProvider } = await import('./openai/provider');
      return new OpenAIProvider(modelConfig.modelId);
    
    case 'anthropic':
      const { AnthropicProvider } = await import('./anthropic/provider');
      return new AnthropicProvider(modelConfig.modelId);
    
    case 'moonshot':
      const { MoonshotProvider } = await import('./moonshot/provider');
      return new MoonshotProvider(modelConfig.modelId, modelConfig.endpoint!);
    
    default:
      throw new Error(`Unsupported provider: ${modelConfig.provider}`);
  }
}
