// AI 国学对话 API - 多模型版本
// POST /api/ai/chat

import { NextRequest, NextResponse } from "next/server";
import { getGuoxueResponse } from "@/lib/minimax/client";
import { createAIClient, ChatMessage } from "@/lib/ai/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      message, 
      category, 
      conversationId, 
      stream,
      modelId  // 可选：指定使用的模型
    } = body;

    if (!message) {
      return NextResponse.json(
        { error: "消息内容不能为空" },
        { status: 400 }
      );
    }

    // 默认使用 MiniMax
    const selectedModel = modelId || 'minimax-abab6.5s-chat';

    // 构建消息
    const systemPrompt = getSystemPrompt(category);
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ];

    // 如果需要流式响应
    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            const client = await createAIClient(selectedModel);
            const response = await client.chat({
              messages,
              modelId: selectedModel,
              temperature: 0.7,
              maxTokens: 2048
            });
            
            // 发送内容
            controller.enqueue(encoder.encode(response.content));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    // 普通响应 - 使用统一客户端
    const client = await createAIClient(selectedModel);
    const response = await client.chat({
      messages,
      modelId: selectedModel,
      temperature: 0.7,
      maxTokens: 2048
    });

    return NextResponse.json({
      success: true,
      data: {
        message: response.content,
        conversationId,
        model: selectedModel,  // 返回使用的模型
        usage: response.usage
      },
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "AI 服务暂时不可用，请稍后再试" },
      { status: 500 }
    );
  }
}

// 根据分类获取系统提示
function getSystemPrompt(category?: string): string {
  const prompts: Record<string, string> = {
    'guoxue': `你是一位精通中国国学的智者，精通《易经》、《道德经》、《论语》等经典。
    请以深厚的国学修养和智慧来回答问题，引用经典时要注明出处。
    回答要简洁有力，富有哲理。`,
    
    'fortune': `你是一位面相大师，精通易经八卦和面相学。
    根据用户提供的面部特征或生辰八字，给出专业的运势分析和建议。
    分析要客观专业，富有建设性。`,
    
    'taoism': `你是一位道家高人，精通道家修炼和养生之道。
    解答关于道家思想、修炼方法、养生之道的问题。
    回答要深邃内敛，富有启发性。`,
    
    'fengshui': `你是一位风水大师，精通阴阳五行和风水布局。
    提供专业的风水建议，包括家居、办公、商业风水等。
    分析要专业细致，富有实用性。`,
    
    'default': `你是一位融合国学智慧与现代AI的导师，
    专门为企业家提供精神指导和智慧启示。
    回答要简洁有力，富有洞察力。`
  };

  return prompts[category || 'default'] || prompts['default'];
}
