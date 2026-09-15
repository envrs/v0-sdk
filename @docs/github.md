---
title: GitHub
description: Connect GitHub repositories to v0 and ship changes through branches, previews, pull requests, and CI.
product: v0
type: integration
prerequisites:
  - /docs/quickstart
related:
  - /docs/git-import
  - /docs/deployments
  - /docs/vercel-integration
  - /docs/projects
---

# GitHub



Connect a v0 project to GitHub to keep its code in a repository, work on isolated branches, preview changes, run CI, and publish through pull requests.

<Callout>
  **Plus plans:** By default, team members must have access to a GitHub
  repository to collaborate on its associated chat and generate previews. To
  allow members without a GitHub connection on their Vercel account to
  participate, enable **Allow v0 to Act on Behalf of Members** in your [workspace
  settings](https://v0.app/settings/workspace). See [Teams → GitHub
  repository access](/docs/teams#github-repository-access) for details.
</Callout>

## How v0 works with Git

When a chat is connected to GitHub, it starts from the base branch you selected. When v0 has a code change to push, it creates a working branch from that base. Generated code changes are then committed and pushed to the working branch automatically.

| Branch                | How v0 uses it                                                                                                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Default branch**    | The repository's default branch on GitHub. v0 selects it initially when you import a repository unless you choose another branch.                                                                                                        |
| **Base branch**       | The branch a chat starts from and the branch its pull request targets.                                                                                                                                                                   |
| **Working branch**    | The branch v0 creates for a chat. v0 pushes generated changes here instead of pushing directly to the base branch.                                                                                                                       |
| **Production branch** | The branch configured on the linked Vercel project to create production deployments. It is often the default or base branch, while other branches create [preview deployments](https://vercel.com/docs/deployments/preview-deployments). |

After a successful publish, v0 returns the chat to its updated base branch. The next code change starts a new working branch, so you can continue in the same chat and publish again.

## Connect a project to GitHub

<Callout type="warning">
  Once a GitHub repository is connected, it becomes the source of truth for
  your project's code. If you delete the repository, the code may become
  unrecoverable.
</Callout>

To connect an existing v0 project:

1. Open the **Project menu** `...` → **Settings** → **GitHub**.
2. Select **Connect**.
3. Under **Git Scope**, select the GitHub account or organization that will own the repository.
4. Enter a **Repository Name**.
5. Select **Create Repository**. v0 creates a private repository and pushes the project's current code to it.

Manage or repair the connection later from **Project menu** `...` → **Settings** → **GitHub**.

### Import an existing repository

To start from code already on GitHub, use [Import from GitHub](/docs/git-import). Importing creates a chat at the selected base branch; the first code change creates its working branch. It does not duplicate a repository you can write to. You can connect the import to an existing Vercel project or create a new one.

## Work from the branch menu

A GitHub-backed chat shows its current branch next to **Publish** in the chat header. Before the first code change and after a publish, this is the base branch. v0 creates the working branch lazily when it has a code change to push. The branch menu brings the Git workflow into one place:

* **Preview deployment:** Inspect the latest deployment for the working branch and open its URL.
* **Branch and diff:** Open the branch on GitHub and see its additions and deletions.
* **Pull request:** Create a pull request or open the existing pull request.
* **CI checks:** See whether checks are running, passing, skipped, or failing.
* **Pull Changes:** Bring changes from the base branch into the working branch.
* **Review or repair:** Ask v0 to review the branch, fix a failed preview build or CI check, or resolve merge conflicts. The action changes to match the current branch state.

<Video src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/changelog/unified-publish-flow-2.mp4" caption="Review a GitHub branch preview and publish it to production." />

Each working branch gets its own Vercel preview deployment. Use it to review the app before publishing without changing the project's production URL.

## Publish GitHub changes

When you are ready to ship:

1. Review the branch preview and CI status from the branch menu.
2. Select **Publish**.
3. Confirm the domain and deployment visibility when prompted.
4. Select **Publish** to finish.

v0 creates a pull request if the branch does not have one, or reuses its existing pull request. It then merges the pull request into the base branch and waits for the production deployment.

### Branch protection and blocked publishes

v0 follows the repository's GitHub rules. Required checks, required reviews, draft pull requests, and other branch protections can block the merge. When that happens, v0 keeps the pull request open, explains what needs attention, and links to the pull request on GitHub. Complete the requirement, then select **Publish** again.

If the pull request has merge conflicts or CI failures that v0 can address, open the branch menu and select **Fix Conflicts**, **Fix CI**, or **Fix CI + Conflicts**.

## Continue after publishing

You do not need to create a new chat after every publish. After the pull request merges, v0 synchronizes the chat with the base branch. Continue prompting in the same chat; the next code change creates the next working branch and preview.

Create another chat when you want a separate stream of work. Each chat starts from its selected base branch and creates an isolated working branch for its first code change, while sharing the same GitHub repository and Vercel project.

## Duplicate a branch

To continue the current work in a separate chat:

1. Open the chat menu and select **Duplicate…**.
2. Enter the name for the new branch.
3. Select **Branch**.

The **Duplicate Branch** dialog creates a new chat and branch containing the current branch's commits. The duplicate stays connected to the same GitHub repository and Vercel project and targets the same base branch for pull requests.

## Troubleshooting

### The repository is missing from Import from GitHub

Make sure the [Vercel GitHub App](https://github.com/apps/vercel) is installed for the correct GitHub account or organization and has access to the repository. You can change repository access in your [GitHub App settings](https://github.com/settings/installations).

### The branch has no preview

A preview appears after v0 pushes a code change to the working branch. If the branch menu says **No active preview**, make a code change in the chat and wait for the push and deployment to finish.

### Pull Changes is unavailable

**Pull Changes** is enabled when the base branch has commits that the chat does not. If the pull request has conflicts, resolve them first with **Fix Conflicts**.

### Publish is blocked

Open the pull request and review its required checks, reviews, and branch rules. You can ask v0 to fix actionable CI or merge-conflict failures, but required human reviews must be completed in GitHub.

## Next steps

* [Import an existing GitHub repository](/docs/git-import)
* [Learn how previews and production deployments work](/docs/deployments)
* [Manage the connected Vercel project](/docs/vercel-integration)



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
