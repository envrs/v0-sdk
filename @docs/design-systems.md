---
title: Design systems
description: Create a custom registry to use your design system with v0 and Shadcn.
product: v0
type: guide
prerequisites:
  - /docs/quickstart
related:
  - /docs/figma
  - /docs/design-mode
---

# Design systems



You can set up a custom design system to use with Tailwind and `shadcn/ui` for high-fidelity UIs that match your brand.

<Callout>
  This is the legacy registry-based design systems guide. For the current Design Systems 2.0 workflow, see [Design Systems 2.0](/docs/design-systems-2).
</Callout>

## Tailwind config

v0 supports tailwind configs and `globals.css` files, you can use custom utility classes and CSS variables in your generations.

<Video src="/docs/videos/tailwind-config.mp4" />

## Shadcn components

v0 uses [Shadcn/ui](https://ui.shadcn.com/) as its default component system to generate high-quality, customizable UIs.

`shadcn/ui` is not a component library but rather a toolkit for building one. Unlike traditional component libraries, `shadcn/ui` gives you direct access to the source code. This works well with AI generated code, as it allows you to customize the components to fit your design system.

Although v0 defaults to `shadcn/ui`, it is still capable of generating code using other component libraries, styling tools, and even frameworks.

## What is a registry?

A registry is a distribution specification designed to pass context from your design system to AI Models.

For example, the [Shadcn Registry](https://ui.shadcn.com/docs/registry) provides a structured way to share your components, blocks, and design tokens with v0. It lets v0 generate prototypes that match your design system, without manual overrides.

## How to create a registry

To get started, you can use [Vercel's Registry Starter Template](https://vercel.com/templates/next.js/shadcn-ui-registry-starter), built with `shadcn/ui`.

## Customizing the registry

To customize the registry to match your design system, you must style the registry using your design systems tokens (e.g. colors, fonts, etc).

The Registry Template assumes you follow the `shadcn/ui` CSS variables standard, which can be found in the [documentation](https://ui.shadcn.com/docs/theming#list-of-variables).

### Colors

You can overwrite the colors in the [`src/app/tokens.css`](https://github.com/vercel/registry-starter/blob/main/src/app/tokens.css) file with your custom theme ensuring all the variable names remain unchanged.

You may choose from a few default themes on [`ui.shadcn.com/themes`](https://ui.shadcn.com/themes) or utilize free, third-party tools such as [`tweakcn.com`](https://tweakcn.com) to design your own.

### Fonts

To update the font, modify [`src/app/layout.tsx`](https://github.com/vercel/registry-starter/blob/main/src/app/layout.tsx) and import your chosen font using `next/font.google`. `shadcn/ui` and Tailwind are preconfigured to use the `--font-sans`, `--font-mono`, and `--font-serif` variables. See the [Next.js documentation](https://nextjs.org/docs/app/getting-started/fonts) to learn more about custom fonts.

You can also use `@font-face` to import custom fonts:

```css
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src:
    url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm45xW5rygbi49c.woff2')
      format('woff2'),
    url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm45xW5rygbj49c.woff')
      format('woff');
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src:
    url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD-w.woff2')
      format('woff2'),
    url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3g3D_w.woff')
      format('woff');
}
```

If you introduce new `*.css` files, ensure they are imported in all of the `layout.tsx` and any layout in your [`/src/v0/`](https://github.com/vercel/registry-starter/blob/main/src/v0) directory.

### Custom components

The Registry template comes with all the default `shadcn/ui` [primitive UI components](https://ui.shadcn.com/docs/components) and some prebuilt, example components.

v0 automatically uses `shadcn/ui` components in your generation, so there is no need to import the UI primitives into v0. If you customize the underlying `shadcn/ui` components in your registry, you may see unexpected v0 generations. v0 is specifically trained on the default implementations of the `shadcn/ui` components and may struggle with any customizations.

To use custom UI primitives and components, you must follow a few steps to ensure it's properly added to your Registry.

1. Add the new UI primitive or component code to your registry source code.
2. Add a new `registry-item` in [`registry.json`](https://github.com/vercel/registry-starter/blob/main/registry.json).

If you want to ensure the Registry UI also gets updated, you must also add a new demo to [`src/app/demo/[name]/index.tsx`](https://github.com/vercel/registry-starter/blob/main/src/app/demo/%5Bname%5D/index.tsx) following the structure in [`{ui|components|blocks}/`](https://github.com/vercel/registry-starter/tree/main/src/app/demo/%5Bname%5D) directory.

### Custom blocks

The Registry template comes with three example blocks:

1. A blank application
2. A dashboard application
3. A store application

These application blocks serve as a good starting point for prototypes. Depending on your use case, you can create custom blocks to meet your team's needs. To add or edit existing blocks:

1. Open or create `src/app/demo/[name]/blocks` and modify its pages or components as you would in a standard Next.js app.
   * Sometimes the layout needed in the registry differs from the layout you want to include in the registry. In such cases, best practice is to create such collateral in [`/src/v0/`](https://github.com/vercel/registry-starter/blob/main/src/v0) to reference in your `registry.json` as shown in next step.
2. Add a new `registry-item` to the `registry.json` to represent your new block. Make sure the entry follows the `registry-item` [specification](https://ui.shadcn.com/docs/registry/registry-item-json)
   1. Specify other registry dependencies by using the `registryDependencies` property
      * For example, a block might reference smaller, more specific UI primitives or components from your `registry.json`.
   2. Include all relevant files in the `files` property
      * The `path` property points to the local file path of your component/page
      * The `target` property specifies where the file will be placed in v0 during the import
3. Deploy your updated registry.
4. Navigate to your Registry's `/registry/[name]` page to view your new block with an `Open in v0` button.

## Deploying your registry

Before deploying it, the template contains a [`registry.json`](https://github.com/vercel/registry-starter/blob/main/registry.json) file which exposes the default components/blocks in the registry. The `baseUrl` and the full route dependency URLs must be replaced with your deployed URL.

## Using a registry in v0

To use your registry, you can open all UI primitives, components, and blocks using the `Open in v0` button. This will make an API call to [v0.app](https://v0.app) with the necessary metadata, file content, and styles of the respective UI primitive, component, or block.

This allows for v0 to have a starting point and context on your specific design system.

## Integrating the registry with AI code editors

To integrate your Registry with AI code editors like Cursor and Windsurf, you can use the following MCP.

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"],
      "env": {
        "REGISTRY_URL": "https://registry-starter.vercel.app/r/registry.json"
      }
    }
  }
}
```

Using a Registry with MCP allows your engineers and AI editors to have centralized, AI-native context on your design system and components.
