# Vercel Deployment Guide for v0 SDK Examples

This guide explains how to deploy the v0 SDK example applications to Vercel.

## Quick Start

### Prerequisites

- A Vercel account (https://vercel.com)
- Vercel CLI installed: `npm i -g vercel` or `pnpm add -g vercel`
- GitHub account (for repository connection)
- Required API keys/secrets (see each example)

### Deploy from GitHub

The easiest way to deploy is through GitHub:

1. **Fork or connect the repository** to your Vercel account
2. **Select an example** to deploy in the Vercel dashboard
3. **Configure environment variables** (see example-specific guides below)
4. **Click Deploy**

### Deploy from CLI

Deploy any example directly from your terminal:

```bash
# Deploy simple-v0
cd examples/simple-v0
vercel --prod

# Deploy v0-clone
cd examples/v0-clone
vercel --prod

# Deploy classic-v0
cd examples/classic-v0
vercel --prod
```

## Example Applications

### simple-v0

A minimal Next.js application demonstrating v0 SDK integration with rate limiting.

**Stack**: Next.js, v0 SDK, Upstash Redis

**Required Environment Variables**:
```
V0_API_KEY=your_v0_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
KV_REST_API_URL=your_upstash_redis_url
KV_REST_API_TOKEN=your_upstash_redis_token
```

**Setup Instructions**:
1. Get a V0_API_KEY from https://v0.dev/docs/api
2. Create an Upstash Redis database: https://upstash.com
3. In Vercel dashboard, add the environment variables
4. Deploy

**Features**:
- AI chat interface using v0 SDK
- Rate limiting with Upstash Redis
- Real-time chat streaming

---

### v0-clone

Full-featured application with authentication, database, and AI elements.

**Stack**: Next.js, v0 SDK, Vercel Postgres, NextAuth, AI Elements

**Required Environment Variables**:
```
V0_API_KEY=your_v0_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
AUTH_SECRET=generate_with_openssl_rand_-base64_32
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
DATABASE_URL=vercel_postgres_connection_string
DATABASE_URL_UNPOOLED=vercel_postgres_unpooled_connection
```

**Setup Instructions**:
1. Generate AUTH_SECRET: `openssl rand -base64 32`
2. Create GitHub OAuth app at https://github.com/settings/developers
3. Add Vercel Postgres in Vercel dashboard (Project → Storage → Create Database)
4. Copy the connection strings to environment variables
5. Set up authentication in NextAuth configuration
6. Deploy

**Features**:
- GitHub authentication
- User profiles with Postgres
- AI chat with AI elements components
- Full CRUD operations

---

### classic-v0

Minimalist clone of v0 interface.

**Stack**: Next.js, v0 SDK

**Required Environment Variables**:
```
V0_API_KEY=your_v0_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Setup Instructions**:
1. Get V0_API_KEY from https://v0.dev/docs/api
2. Add environment variables
3. Deploy

**Features**:
- Clean, minimalist interface
- Component generation with v0 SDK
- Fast and lightweight

---

### v0-sdk-react-example

React component showcase demonstrating various theming options.

**Stack**: Next.js, v0 SDK React components

**Required Environment Variables**:
```
V0_API_KEY=your_v0_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Setup Instructions**:
1. Get V0_API_KEY from https://v0.dev/docs/api
2. Add environment variables
3. Deploy

**Features**:
- Multiple theme demonstrations
- React component rendering
- Responsive design examples

---

### ai-tools-example

Advanced example showing AI SDK tools integration.

**Stack**: Next.js, v0 SDK AI Tools, OpenAI API

**Required Environment Variables**:
```
V0_API_KEY=your_v0_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
OPENAI_API_KEY=your_openai_api_key
```

**Setup Instructions**:
1. Get V0_API_KEY from https://v0.dev/docs/api
2. Get OpenAI API key from https://platform.openai.com
3. Add environment variables
4. Deploy

**Features**:
- AI-powered code generation
- Advanced tool integration
- Real-time streaming responses

---

## Manual Deployment Steps

### Step 1: Prepare Environment

```bash
# Clone the repository
git clone https://github.com/vercel/v0-sdk.git
cd v0-sdk

# Install dependencies
pnpm install
```

### Step 2: Build and Test Locally

```bash
# Build packages
pnpm build:packages

# Test specific example
cd examples/simple-v0
pnpm build
pnpm start
```

### Step 3: Deploy to Vercel

```bash
# Option A: Using Vercel CLI
vercel --prod

# Option B: Connect GitHub to Vercel dashboard
# https://vercel.com/new
```

### Step 4: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings
2. Select "Environment Variables"
3. Add all required variables for your example
4. Redeploy

### Step 5: Verify Deployment

After deployment:
1. Visit the deployment URL
2. Test core functionality
3. Check logs: `vercel logs --prod`
4. Monitor performance in Vercel Analytics

---

## Troubleshooting

### Build Failures

**Issue**: "Cannot find module" error
```
Solution: Ensure all environment variables are set in Vercel dashboard
          Clear cache: vercel env pull
```

**Issue**: "Timeout" during build
```
Solution: Check function duration settings in vercel.json
          Increase maxDuration for API routes
```

### Runtime Errors

**Issue**: API key not working
```
Solution: Verify environment variables are set correctly
          Check that NEXT_PUBLIC_* variables are visible to frontend
```

**Issue**: Database connection failed
```
Solution: Verify DATABASE_URL is correct in Vercel dashboard
          Test connection locally: psql $DATABASE_URL
```

### Performance Issues

**Issue**: Slow initial load
```
Solution: Enable ISR (Incremental Static Regeneration) in config
          Use vercel.json caching rules
          Check Web Vitals in Vercel Analytics
```

---

## Monitoring & Observability

### Vercel Dashboard

- **Deployments**: View deployment history and status
- **Logs**: Real-time application logs
- **Analytics**: Performance metrics and usage
- **Errors**: Error tracking and debugging

### Web Vitals

Monitor performance metrics:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

View in: Project Settings → Analytics

### Environment Variables

Manage secrets securely:
1. Never commit `.env` files
2. Use Vercel's built-in secret management
3. Rotate keys regularly
4. Use different keys per environment (staging/production)

---

## GitHub Actions & CI/CD

Deployments are automated via GitHub Actions when you push to `main`:

1. **Push to main branch** → GitHub Actions runs tests and builds
2. **Build succeeds** → Vercel deploys automatically
3. **Deployment complete** → Get preview URL and status

View workflows in: `.github/workflows/`

---

## Scaling & Production

### Database Optimization

For v0-clone with Postgres:
1. Enable connection pooling in Vercel Postgres settings
2. Use parameterized queries to prevent SQL injection
3. Add indexes on frequently queried columns

### Caching Strategies

1. **Static generation** (ISR): Pre-generate pages at build time
2. **Incremental regeneration**: Update pages on-demand
3. **CDN caching**: Cache assets at edge

### Rate Limiting

1. **API routes**: Set limits per endpoint
2. **Upstash Redis**: Use for distributed rate limiting
3. **Vercel Edge Config**: Store allowlists/blocklists

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **v0 API Docs**: https://v0.dev/docs/api
- **GitHub Issues**: https://github.com/vercel/v0-sdk/issues
- **Vercel Community**: https://vercel.com/support

---

## Next Steps

After deploying:

1. **Share your deployment** with colleagues
2. **Set up custom domain** for production
3. **Configure analytics** to monitor usage
4. **Set up alerts** for errors and performance
5. **Plan scaling** for high-traffic scenarios

For more details on individual examples, see `examples/{app}/DEPLOYMENT.md`
