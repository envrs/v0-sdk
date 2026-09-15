---
title: Design mode
description: Visually edit your app by selecting elements, tweaking styles, and applying the results back to your code.
product: v0
type: guide
prerequisites:
  - /docs/quickstart
related:
  - /docs/code-editing
  - /docs/figma
---

# Design mode



Design mode provides an intuitive, visual way to refine your app's user interface. It lets you select any element in the live preview, tweak its styles with a visual panel (and/or natural-language instructions), and then apply those edits back to your source code.

<Video src="/docs/videos/design-mode.mp4" />

### Enabling design mode

Open Design mode by selecting the **Design** tab in the preview toolbar.

<Image alt="Design mode button in the prompt form" src="/docs/light/design-mode.png" srcDark="/dark/design-mode.png" width={616} height={238} />

Design mode opens beside your running app and provides layers, selection controls, and an editing panel.

Design mode is only available on chats that use the latest preview runtime, and only on the latest version of the chat. It is not available on read-only chats or on mobile viewports.

### Selecting elements

With design mode on, your cursor becomes a selection tool. As you hover over your running app in the preview, elements are highlighted. Click an element to select it, and v0 will show selection handles plus the design panel for that element.

To toggle between selecting elements and interacting with your app normally, use the **Inspect** control in the design panel, or press `Cmd + I` / `Ctrl + I`. Press `Escape` to deselect the current element.

<Image alt="Selecting an element" src="/docs/light/design-element.png" srcDark="/dark/design-element.png" width={2970} height={1704} />

### Modifying elements

Once an element is selected, you have two ways to change it — and you can combine them on a single element before applying.

#### 1. The design panel (for fine-tuning)

The design panel offers a suite of controls for making precise visual adjustments. It's ideal for tweaking styles to perfection. The panel includes:

<Image alt="Design panel controls" src="/docs/light/controls.png" srcDark="/dark/controls.png" width={1528} height={2226} />

* **Typography**: Font family, size, weight, line height, letter spacing, alignment, and text decoration.
* **Color**: Text color.
* **Background**: Background color.
* **Layout**: Margin and padding on all sides.
* **Border**: Border color, style, and width.
* **Appearance**: Opacity and corner radius.
* **Shadow**: Add or customize box shadows.
* **Content**: Directly edit the text content of an element.

Tweaks made in the panel are applied live in the preview so you can see the result immediately. They're held as pending edits until you apply them (see below).

Design mode detects when your app is using Tailwind CSS and will surface Tailwind-compatible values where appropriate. Class and token coverage depends on what's defined in your project.

#### 2. Instructions (for complex changes)

For anything structural or hard to express in the panel — "add a button next to this text", "make this a three-column grid", "match the style of the card above" — type a natural-language instruction into the text box in the design panel. v0 automatically attaches a screenshot of the selected element along with your instructions.

<Image alt="Prompting v0 while in design mode" src="/docs/light/design-prompt.png" srcDark="/dark/design-prompt.png" width={2966} height={1700} />

#### Undo, redo, reset, and preview

While you're editing, the panel exposes controls to help you iterate before committing:

* **Undo / Redo**: Step back and forward through your pending tweaks.
* **Reset**: Clear all pending design-mode edits on the current element.
* **Before / after preview**: Temporarily toggle off all pending edits so you can compare your changes with the original.

Pending edits are kept until you apply them or leave the chat. If you try to navigate away while there are unapplied edits, v0 will warn you.

### Applying your edits

When you're happy with your changes, click **Apply** in the design panel. v0 serializes your edits (and any instructions / screenshots), sends them to the chat, and generates an updated version of your project that reflects the changes in your source code. Because Apply produces a new chat version, you can review the diff, keep iterating, or revert just like any other v0 edit.

<Image alt="Apply button in the design panel" src="/docs/light/design-save.png" srcDark="/dark/design-save.png" width={1698} height={262} />

### Key features

* **Works on your real app**: Design mode runs against the live preview of your project, so what you see is exactly what your users will see.
* **Visual and prompt-based edits together**: Combine precise panel tweaks with natural-language instructions on the same element before applying.
* **Edits are committed as a new version**: Applying creates a normal v0 chat version, so every design-mode change is diffable, reviewable, and revertable.
* **Tailwind-aware**: When your app uses Tailwind CSS, design mode surfaces Tailwind-compatible values where possible.



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
