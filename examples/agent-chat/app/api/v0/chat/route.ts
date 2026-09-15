import { v0 } from 'v0'

export async function POST(request: Request) {
  const body = await request.json()
  const { prompt } = body

  const result = await v0.chats.create({ message: prompt })
  return Response.json(result)
}
