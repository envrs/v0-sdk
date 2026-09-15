import { authorizeProxyRequest, toJsonResponse } from '@/lib/proxy'
import { v0 } from 'v0'

export async function POST(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const denied = authorizeProxyRequest(request)
  if (denied) return denied

  const { chatId } = await params
  const body = await request.json()
  const result = await v0.chats.resume({ chatId, ...body })
  const response = result.toResponse()
  return toJsonResponse({ data: await result.final, response })
}
