# simple-v0 Deployment Guide

Minimal Next.js application with v0 SDK integration and rate limiting.

## Prerequisites

- Vercel account (https://vercel.com)
- Upstash account (https://upstash.com)
- v0 API key (https://v0.dev/docs/api)

## Quick Deploy

### 1. Get Required Credentials

**v0 API Key:**

- Visit https://v0.dev/docs/api
- Generate an API key
- Save it securely

**Upstash Redis:**

- Create account at https://upstash.com
- Create a Redis database
- Copy `REDIS_URL` and `REDIS_TOKEN` from database dashboard

### 2. Configure Environment Variables

In Vercel dashboard (Project Settings → Environment Variables):

```env
V0_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=https://your-deployment.vercel.app
KV_REST_API_URL=https://xxxxx.upstash.io
KV_REST_API_TOKEN=your_token_here
```

### 3. Deploy

Option A - **GitHub Integration** (Recommended):

```bash
git push origin main  # Triggers automatic deployment
```

Option B - **Vercel CLI**:

```bash
vercel --prod
```

## Local Development

```bash
# Install dependencies (from monorepo root)
pnpm install

# Set up local environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Build and start
pnpm build --filter=simple-v0
cd examples/simple-v0
pnpm dev

# Open http://localhost:3000
```

## Features

- **AI Chat**: Interact with v0 API using streaming responses
- **Rate Limiting**: Requests limited per user with Upstash Redis
- **Real-time Streaming**: See AI responses as they generate
- **Session Management**: User sessions tracked with rate limits

## API Routes

### POST /api/chat

Generate chat responses with rate limiting.

**Request:**

```json
{
  "message": "Create a React button component",
  "sessionId": "unique-session-id"
}
```

**Response:**

```json
{
  "response": "Generated component code...",
  "rateLimitRemaining": 9
}
```

**Rate Limit Headers:**

- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests left
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## Troubleshooting

**Issue**: "Rate limit exceeded"

- Solution: Wait for limit to reset (default: 10 per hour per session)
- Check Redis connection in logs: `vercel logs`

**Issue**: "Invalid API key"

- Solution: Verify V0_API_KEY is correct in environment variables
- Regenerate key at https://v0.dev/docs/api

**Issue**: "Redis connection failed"

- Solution: Check KV_REST_API_URL and KV_REST_API_TOKEN
- Verify Upstash database is running

**Issue**: "NEXT_PUBLIC_APP_URL not set"

- Solution: This variable must be set in Vercel environment variables
- Format: `https://your-domain.vercel.app`

## Monitoring

**View Logs:**

```bash
vercel logs --prod --follow
```

**Check Redis:**

- Upstash dashboard → Select database → View data
- Monitor request count and performance

**Performance:**

- Vercel Analytics → Web Vitals
- Check response times and error rates

## Environment Variables Reference

| Variable            | Required | Example                  | Notes                            |
| ------------------- | -------- | ------------------------ | -------------------------------- |
| V0_API_KEY          | Yes      | `v0_xxx...`              | Get from https://v0.dev/docs/api |
| NEXT_PUBLIC_APP_URL | Yes      | `https://app.vercel.app` | Used for redirects and CORS      |
| KV_REST_API_URL     | Yes      | `https://xxx.upstash.io` | From Upstash dashboard           |
| KV_REST_API_TOKEN   | Yes      | `token_xxx...`           | From Upstash dashboard           |

## Advanced Configuration

### Custom Rate Limits

Edit `/app/api/chat/route.ts`:

```typescript
const RATE_LIMIT = 10 // Change this value
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in milliseconds
```

### Custom Domain

In Vercel dashboard:

1. Project Settings → Domains
2. Add custom domain
3. Update NEXT_PUBLIC_APP_URL environment variable

## Scaling

For high-traffic scenarios:

1. **Increase Upstash plan**: Upgrade Redis database tier
2. **Enable ISR**: Configure incremental static regeneration
3. **Add caching**: Cache responses where appropriate
4. **Monitor**: Set up error alerts in Vercel dashboard

## Security

- API keys are stored securely in Vercel environment variables
- Never commit `.env.local` to Git
- Rotate API keys regularly
- Use HTTPS only (enforced by Vercel)
- Rate limiting prevents abuse

## Support

- **Vercel Docs**: https://vercel.com/docs
- **v0 SDK**: https://v0.dev/docs/api
- **Upstash**: https://upstash.com/docs
- **Issues**: https://github.com/vercel/v0-sdk/issues
