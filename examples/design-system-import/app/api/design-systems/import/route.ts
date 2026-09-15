import { v0 } from 'v0'
import { authorizeProxyRequest, toJsonResponse } from '@/lib/proxy'

export async function POST(request: Request) {
  const denied = authorizeProxyRequest(request)
  if (denied) return denied

  const body = await request.json()
  const { sources, envVars, notes } = body

  try {
    const result = await v0.chats.create({
      message: `Import design system from sources: ${sources.map((s: { url: string }) => s.url).join(', ')}`,
    })

    return toJsonResponse({
      data: {
        chatId: result.data?.chat?.id ?? '',
        sources,
        envVars,
        notes,
        status: 'importing',
      },
      response: new Response(JSON.stringify({}), { status: 200 }),
    })
  } catch (error) {
    return toJsonResponse({
      error: error instanceof Error ? error.message : 'Import failed',
      response: new Response(JSON.stringify({}), { status: 500 }),
    })
  }
}
