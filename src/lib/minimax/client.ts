// Minimax 大模型 API 集成
// 支持 abab6.5s-chat, abab6.5-chat 等模型

import { APIError } from "./errors";

interface MinimaxConfig {
  apiKey: string;
  model: string;
  endpoint: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// 默认配置
const defaultConfig: MinimaxConfig = {
  apiKey: process.env.MINIMAX_API_KEY || "",
  model: process.env.MINIMAX_MODEL || "abab6.5s-chat",
  endpoint: process.env.MINIMAX_ENDPOINT || "https://api.minimax.chat/v1",
};

export class MinimaxClient {
  private config: MinimaxConfig;

  constructor(config?: Partial<MinimaxConfig>) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * 发送对话请求
   */
  async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const url = `${this.config.endpoint}/chat/completions`;

    const body = {
      model: request.model || this.config.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 4096,
      stream: false,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new APIError(
          error.message || "API 请求失败",
          response.status,
          error.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(
        error instanceof Error ? error.message : "未知错误",
        500
      );
    }
  }

  /**
   * 流式对话请求
   */
  async *chatStream(request: ChatCompletionRequest): AsyncGenerator<string> {
    const url = `${this.config.endpoint}/chat/completions`;

    const body = {
      model: request.model || this.config.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 4096,
      stream: true,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(
        error.message || "API 请求失败",
        response.status,
        error.code
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("无法读取响应流");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }
  }

  /**
   * 国学对话专用 - 设置系统提示
   */
  async guoxueChat(
    userMessage: string,
    context?: {
      conversationHistory?: ChatMessage[];
      category?: "confucian" | "taoist" | "fengshui" | "yijing" | "general";
    }
  ): Promise<string> {
    const systemPrompts = {
      confucian: `你是儒家国学大师，精通《论语》、《孟子》、《大学》、《中庸》等儒家经典。
      你的风格：温文尔雅、引经据典、深入浅出。
      回答时要结合儒家思想，并给出实际的人生指导建议。`,
      taoist: `你是道家思想大师，精通《道德经》、《庄子》等道家经典。
      你的风格：逍遥自在、辩证思维、顺应自然。
      回答时要体现道家的无为而治、阴阳平衡思想。`,
      fengshui: `你是风水大师，精通传统风水学、阴阳五行。
      你的风格：神秘智慧、务实建议、因地制宜。
      回答时要根据具体情况给出风水调整建议。`,
      yijing: `你是易经大师，精通六十四卦、爻辞、象数。
      你的风格：博大精深、审时度势、趋吉避凶。
      回答时要结合易经智慧给出指导。`,
      general: `你是国学智慧导师，博学多才，精通儒释道等传统文化。
      你的风格：睿智平和、融会贯通、古为今用。
      回答时要体现传统智慧在现代生活中的应用。`,
    };

    const messages: ChatMessage[] = [
      {
        role: "system",
        content:
          systemPrompts[context?.category || "general"] ||
          systemPrompts.general,
      },
      ...(context?.conversationHistory || []),
      { role: "user", content: userMessage },
    ];

    const response = await this.chat({ messages });
    return response.choices[0].message.content;
  }

  /**
   * 面相分析
   */
  async analyzeFace(imageBase64: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: "system",
        content: `你是传统面相大师，结合面相学与心理学进行面部特征分析。
        分析维度包括：
        1. 整体气质
        2. 事业运势
        3. 人际关系
        4. 健康提示
        5. 发展建议

        注意：
        - 分析要客观积极
        - 给出建设性建议
        - 保持专业性和可信度`,
      },
      {
        role: "user",
        content: `请分析这张照片中人物的面相特征。`,
      },
    ];

    const response = await this.chat({ messages });
    return response.choices[0].message.content;
  }
}

// 单例导出
export const minimaxClient = new MinimaxClient();

// 便捷函数
export async function getGuoxueResponse(
  message: string,
  category?: "confucian" | "taoist" | "fengshui" | "yijing" | "general"
): Promise<string> {
  return minimaxClient.guoxueChat(message, { category });
}

export function getStreamResponse(
  message: string,
  category?: string
): AsyncGenerator<string> {
  const systemPrompt = `你是国学智慧导师，回答要体现传统文化智慧。`;

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: message },
  ];

  return minimaxClient.chatStream({ messages });
}
