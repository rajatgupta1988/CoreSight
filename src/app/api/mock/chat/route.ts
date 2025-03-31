// src/app/api/mock/chat/route.ts
export async function POST(req: Request) {
  const { prompt } = await req.json()
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const messages = {
        thinking: `Thinking about ${prompt}`,
        reasoning: 'Let me reason step by step',
        final: `The final answer to '${prompt}' is: 42`,
      }

      for (const stage of Object.keys(messages)) {
        const words = messages[stage as keyof typeof messages].split(' ')
        for (const word of words) {
          const payload = JSON.stringify({ stage, text: word + ' ' }) + '\n'
          controller.enqueue(encoder.encode(payload))
          await new Promise(res => setTimeout(res, 150))
        }
        await new Promise(res => setTimeout(res, 300))
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  })
}
