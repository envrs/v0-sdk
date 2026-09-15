import { v0 } from 'v0'
import { authorizeProxyRequest } from '@/lib/proxy'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string; messageId: string }> },
) {
  const denied = authorizeProxyRequest(request)
  if (denied) return denied

  const { chatId } = await params
  const body = await request.json()
  const result = await v0.messages.resolve({
    chatId,
    task: body.task,
  })

  return result.response
}
