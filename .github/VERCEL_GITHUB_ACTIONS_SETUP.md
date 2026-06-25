# GitHub Actions to Vercel Deployment Setup

This guide explains how to set up automated deployments to Vercel using GitHub Actions.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository access
- Admin permissions for repository secrets

## Step 1: Create Vercel Projects

Create one Vercel project for each example app:

1. Visit https://vercel.com/new
2. Import the v0-sdk repository
3. For each example, create a separate project:
   - simple-v0
   - v0-clone
   - classic-v0
   - v0-sdk-react-example
   - ai-tools-example

Note the Project ID for each (visible in Project Settings → General).

## Step 2: Generate Vercel API Token

1. Go to https://vercel.com/account/tokens
2. Create a new token with:
   - **Name**: GitHub Actions
   - **Scope**: Full Account
   - **Expiration**: Optional
3. Copy the token (you'll only see it once)

## Step 3: Configure GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to: Repository Settings → Secrets and variables → Actions
2. Click "New repository secret" for each:

### Required Secrets

| Secret Name                      | Value                  | Where to Find                             |
| -------------------------------- | ---------------------- | ----------------------------------------- |
| `VERCEL_TOKEN`                   | API token from Step 2  | Vercel account/tokens                     |
| `VERCEL_ORG_ID`                  | Your Vercel account ID | Vercel dashboard → Settings → Team ID     |
| `VERCEL_PROJECT_ID_SIMPLE_V0`    | Project ID             | simple-v0 project → Settings → General    |
| `VERCEL_PROJECT_ID_V0_CLONE`     | Project ID             | v0-clone project → Settings → General     |
| `VERCEL_PROJECT_ID_CLASSIC_V0`   | Project ID             | classic-v0 project → Settings → General   |
| `VERCEL_PROJECT_ID_V0_SDK_REACT` | Project ID             | v0-sdk-react-example → Settings → General |
| `VERCEL_PROJECT_ID_AI_TOOLS`     | Project ID             | ai-tools-example → Settings → General     |

**To find your VERCEL_ORG_ID:**

- Open Vercel dashboard
- Settings → Team ID (in URL: vercel.com/[org-id]/settings)

## Step 4: Configure Environment Variables

For each deployed example, set up the required environment variables in Vercel:

### simple-v0

```
V0_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://simple-v0.vercel.app (or your domain)
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_token
```

### v0-clone

```
V0_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://v0-clone.vercel.app (or your domain)
AUTH_SECRET=generate_with_openssl
AUTH_GITHUB_ID=github_oauth_id
AUTH_GITHUB_SECRET=github_oauth_secret
DATABASE_URL=vercel_postgres_url
DATABASE_URL_UNPOOLED=vercel_postgres_unpooled
```

### classic-v0

```
V0_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://classic-v0.vercel.app (or your domain)
```

### v0-sdk-react-example

```
V0_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://v0-sdk-react.vercel.app (or your domain)
```

### ai-tools-example

```
V0_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://ai-tools-example.vercel.app (or your domain)
OPENAI_API_KEY=your_key
```

**To set environment variables in Vercel:**

1. Project → Settings → Environment Variables
2. Add each variable with its value
3. Select appropriate scopes (Production, Preview, Development)
4. Save

## Step 5: Test the Workflow

### Manual Deployment

Trigger deployment manually:

1. Go to: Repository → Actions
2. Select "Deploy Examples to Vercel" workflow
3. Click "Run workflow"
4. Choose deploy target:
   - `all` - Deploy all examples
   - `simple-v0` - Deploy only simple-v0
   - etc.
5. Watch the workflow run

### Monitor Deployment

1. In GitHub: Actions tab → Watch workflow progress
2. In Vercel: Dashboard → Deployments → See real-time status

## How It Works

### Automatic Deployments (on push to main)

```
developer commits to main
    ↓
GitHub detects changes
    ↓
Actions workflow runs:
  1. Detect which examples changed
  2. Build and test all packages
  3. Deploy changed examples to Vercel
    ↓
Vercel deploys and notifies
    ↓
Deployment live!
```

### Change Detection

The workflow intelligently detects which examples changed:

- **simple-v0 changes detected if:**
  - Files in `examples/simple-v0/` changed
  - Files in `packages/` changed (shared code)

- **Same logic applies to other examples**

### Deployment Strategy

Each example deploys:

- Using the `vercel.json` configuration
- With environment variables from Vercel project settings
- Using monorepo build command: `cd ../.. && pnpm build --filter=example-name`

## Troubleshooting

### "Workflow Failed: Missing Secrets"

**Problem**: Workflow cannot access Vercel secrets

**Solution:**

1. Check all secrets are added to repository
2. Verify secret names match exactly (case-sensitive)
3. Wait 30 seconds for secrets to sync
4. Re-run the workflow

### "Deployment Failed: Command Not Found"

**Problem**: `pnpm` or build command fails

**Solution:**

1. Verify `vercel.json` buildCommand is correct
2. Check that all dependencies are specified in `package.json`
3. Review logs: `vercel logs [project-id]`

### "Deployment Failed: Environment Variable Not Set"

**Problem**: Application can't find environment variables

**Solution:**

1. Check variables are set in Vercel Project Settings
2. Verify variable names match code exactly
3. For `NEXT_PUBLIC_*` vars, ensure they're available to frontend
4. Redeploy project to apply changes

### "Rate Limited by Vercel"

**Problem**: Multiple deployments queued/throttled

**Solution:**

1. Vercel has rate limits on deployments
2. Queue workflows - they run sequentially
3. Wait for current deployment to finish
4. Monitor with `vercel logs --tail`

### "Build Timeout"

**Problem**: Deployment takes too long

**Solution:**

1. Check function duration settings in `vercel.json`
2. Increase `maxDuration` for API routes if needed
3. Check for infinite loops or stuck processes
4. Review Vercel logs for build duration

## Advanced Configuration

### Custom Deployments

Deploy to specific environment:

```bash
# From workflow, use vercel production flag
vercel --prod  # Production deployment
vercel         # Preview deployment
```

### Parallel Deployments

The workflow deploys examples in parallel for speed:

- Build happens once (cached)
- All changed examples deploy simultaneously
- Reduces total workflow time

### Deployment Notifications

Add notifications to your team:

1. **GitHub**: Branch protection rules → require status checks
2. **Slack**: Use GitHub Slack integration → get notified on deployments
3. **Vercel**: Project Settings → Integrations → Slack

## Environment-Specific Variables

### Production Environment

Variables deployed to production servers:

- `DATABASE_URL` for production database
- `AUTH_SECRET` for session signing
- Sensitive keys and tokens

### Preview Environment

Variables for preview deployments (on pull requests):

- Often same as production for testing
- Or separate test database

### Development Environment

Local development only (not deployed):

- Set in `.env.local` file
- Never committed to Git

## Security Best Practices

1. **Rotate tokens regularly**: Vercel tokens have no expiration by default
2. **Use least privilege**: Only grant necessary scopes
3. **Separate secrets per environment**: Different DB URLs, keys, etc.
4. **Audit access**: Monitor who has access to secrets
5. **Never log secrets**: Vercel and GitHub automatically redact secrets
6. **Use GitHub-managed secrets**: Don't store in `.env` files

## Monitoring & Observability

### Workflow Status

Check workflow runs:

1. Repository → Actions tab
2. Select "Deploy Examples to Vercel" workflow
3. View recent runs and their status

### Deployment Logs

Access deployment logs:

```bash
# View deployment logs locally
vercel logs [deployment-id] --follow

# Or in Vercel dashboard:
# Project → Deployments → Select deployment → View Logs
```

### Performance Monitoring

Monitor deployment performance:

1. Vercel Dashboard → Analytics
2. Check Core Web Vitals
3. Monitor function durations
4. Track error rates

## Rollback Procedure

If a deployment has issues:

1. **In Vercel dashboard:**
   - Project → Deployments
   - Click previous working deployment
   - Click "Promote to Production"

2. **Or manually revert:**
   ```bash
   git revert <commit-hash>
   git push origin main  # Triggers new deployment
   ```

## Next Steps

1. **Set up monitoring**: Configure alerts for failed deployments
2. **Add custom domains**: Configure custom domain per project
3. **Scale for traffic**: Upgrade Vercel plan if needed
4. **Set up analytics**: Enable Vercel Analytics
5. **Configure CDN**: Cache static assets at edge

## Support

- **Vercel Docs**: https://vercel.com/docs/concepts/git/vercel-for-github
- **GitHub Actions**: https://docs.github.com/en/actions
- **Workflow Issues**: Repository → Issues → GitHub Actions tag
- **Vercel Support**: https://vercel.com/support

## Quick Reference

### Common Commands

```bash
# Deploy manually from CLI
vercel --prod

# View deployment status
vercel status

# Access logs
vercel logs [deployment-id] --follow

# Pull environment variables
vercel env pull

# Set environment variable
vercel env add VARIABLE_NAME
```

### Workflow File

Workflow configuration: `.github/workflows/deploy.yml`

Customize by editing this file to:

- Add/remove example deployments
- Change build commands
- Modify environment variables
- Adjust timeout settings
