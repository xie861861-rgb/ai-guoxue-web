// 多模型配置系统
// 支持市场上主流的大语言模型

export interface ModelConfig {
  id: string;
  name: string;
  provider: 'doubao' | 'minimax' | 'deepseek' | 'openai' | 'anthropic' | 'moonshot';
  endpoint?: string;  // API 地址
  modelId: string;    // 模型 ID
  description: string;
  capabilities: ('chat' | 'completion' | 'embedding')[];
  contextLength: number;
  pricing?: {
    input: number;  // 每百万 token 价格
    output: number;
  };
}

// 所有可用模型配置
export const AVAILABLE_MODELS: ModelConfig[] = [
  // ============ MiniMax 系列 ============
  {
    id: 'minimax-abab6.5s-chat',
    name: 'MiniMax Abab6.5s',
    provider: 'minimax',
    modelId: 'abab6.5s-chat',
    description: '快速响应，适合实时对话',
    capabilities: ['chat'],
    contextLength: 24576,
    pricing: { input: 0.5, output: 0.5 }
  },
  {
    id: 'minimax-abab6.5-chat',
    name: 'MiniMax Abab6.5',
    provider: 'minimax',
    modelId: 'abab6.5-chat',
    description: '更强理解力，适合复杂任务',
    capabilities: ['chat'],
    contextLength: 24576,
    pricing: { input: 1, output: 1 }
  },

  // ============ 豆包 (Doubao) ============
  {
    id: 'doubao-pro-32k',
    name: '豆包 Pro (32K)',
    provider: 'doubao',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3',
    modelId: 'doubao-pro-32k',
    description: '字节跳动出品，性价比高',
    capabilities: ['chat', 'completion'],
    contextLength: 32768,
    pricing: { input: 0.3, output: 0.3 }
  },
  {
    id: 'doubao-pro-128k',
    name: '豆包 Pro (128K)',
    provider: 'doubao',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3',
    modelId: 'doubao-pro-128k',
    description: '超长上下文，适合文档分析',
    capabilities: ['chat', 'completion'],
    contextLength: 131072,
    pricing: { input: 0.5, output: 0.5 }
  },

  // ============ DeepSeek 系列 ============
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'deepseek',
    endpoint: 'https://api.deepseek.com/v1',
    modelId: 'deepseek-chat',
    description: '国产开源模型，性价比之王',
    capabilities: ['chat', 'completion'],
    contextLength: 32768,
    pricing: { input: 0.14, output: 0.28 }
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek Reasoner',
    provider: 'deepseek',
    endpoint: 'https://api.deepseek.com/reasoner',
    modelId: 'deepseek-reasoner',
    description: '深度推理，适合复杂逻辑',
    capabilities: ['completion'],
    contextLength: 65536,
    pricing: { input: 0.55, output: 2.19 }
  },

  // ============ OpenAI 系列 ============
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    modelId: 'gpt-4o',
    description: 'OpenAI 最新旗舰模型',
    capabilities: ['chat', 'completion'],
    contextLength: 128000,
    pricing: { input: 5, output: 15 }
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    modelId: 'gpt-4o-mini',
    description: '轻量快速，性价比之选',
    capabilities: ['chat', 'completion'],
    contextLength: 128000,
    pricing: { input: 0.15, output: 0.6 }
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    modelId: 'gpt-4-turbo',
    description: '强力模型，适合复杂任务',
    capabilities: ['chat', 'completion'],
    contextLength: 128000,
    pricing: { input: 10, output: 30 }
  },

  // ============ Anthropic Claude ============
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude 4 Sonnet',
    provider: 'anthropic',
    modelId: 'claude-sonnet-4-20250514',
    description: 'Anthropic 最新模型',
    capabilities: ['chat'],
    contextLength: 200000,
    pricing: { input: 3, output: 15 }
  },
  {
    id: 'claude-haiku-3-20250514',
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    modelId: 'claude-haiku-3-20250514',
    description: '快速轻量模型',
    capabilities: ['chat'],
    contextLength: 200000,
    pricing: { input: 0.25, output: 1.25 }
  },

  // ============ Kimi (Moonshot) ============
  {
    id: 'moonshot-v1-8k',
    name: 'Kimi (8K)',
    provider: 'moonshot',
    endpoint: 'https://api.moonshot.cn/v1',
    modelId: 'moonshot-v1-8k',
    description: '月之暗面出品',
    capabilities: ['chat'],
    contextLength: 8192,
    pricing: { input: 12, output: 12 }
  },
  {
    id: 'moonshot-v1-32k',
    name: 'Kimi (32K)',
    provider: 'moonshot',
    endpoint: 'https://api.moonshot.cn/v1',
    modelId: 'moonshot-v1-32k',
    description: '更长上下文',
    capabilities: ['chat'],
    contextLength: 32768,
    pricing: { input: 12, output: 12 }
  },
  {
    id: 'moonshot-v1-128k',
    name: 'Kimi (128K)',
    provider: 'moonshot',
    endpoint: 'https://api.moonshot.cn/v1',
    modelId: 'moonshot-v1-128k',
    description: '超长文档分析',
    capabilities: ['chat'],
    contextLength: 131072,
    pricing: { input: 12, output: 12 }
  }
];

// 按提供商分组
export const MODELS_BY_PROVIDER = {
  minimax: AVAILABLE_MODELS.filter(m => m.provider === 'minimax'),
  doubao: AVAILABLE_MODELS.filter(m => m.provider === 'doubao'),
  deepseek: AVAILABLE_MODELS.filter(m => m.provider === 'deepseek'),
  openai: AVAILABLE_MODELS.filter(m => m.provider === 'openai'),
  anthropic: AVAILABLE_MODELS.filter(m => m.provider === 'anthropic'),
  moonshot: AVAILABLE_MODELS.filter(m => m.provider === 'moonshot')
};

// 默认模型选择
export const DEFAULT_MODEL = 'minimax-abab6.5s-chat';

// 获取模型配置
export function getModelConfig(modelId: string): ModelConfig | undefined {
  return AVAILABLE_MODELS.find(m => m.id === modelId);
}
