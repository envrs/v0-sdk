---
title: Code editing
description: Edit v0's code output directly in the browser.
product: v0
type: guide
prerequisites:
  - /docs/quickstart
related:
  - /docs/text-prompting
  - /docs/design-mode
---

# Code editing



v0 includes a full-featured code editor with syntax highlighting, global search, diff views, split editing, and more.

<Video src="/docs/videos/code%20editor.mp4" />

## Basic editing

Select the **Code** tab in the preview toolbar to access the editor. You can edit any file directly. When you make changes, an "Unsaved Changes" banner appears where you can save or reset. Press `Cmd+S` (Mac) or `Ctrl+S` (Windows/Linux) to save.

<Image alt="Switching from preview to code view" src="/docs/light/switchlight.gif" srcDark="/dark/switchdark.gif" width={1200} height={800} />

## Editor features

v0 integrates a capable IDE that includes many of the expected features along with their shortcuts, such as:

* **Syntax highlighting**: Code is properly highlighted based on the file type
* **Line numbers**: Easily navigate through your code with line numbers
* **Find and replace**: Press `Cmd+F` / `Ctrl+F` to search within the current file
* **Global search**: Press `Shift+Cmd+F` / `Shift+Ctrl+F` to search across all files. Filter results with "files to include" and "files to exclude" options
* **File Explorer**: Press `Cmd+B` / `Ctrl+B` to toggle the file explorer panel

### Diff view

View v0's changes in the diff view. This helps you understand exactly what was modified in each generation. Click the **Toggle Diff View** button in the editor toolbar to enable it.

<Image alt="Diff view showing code changes" src="/docs/light/diffviewlight.png" srcDark="/dark/diffviewdark.png" width={3154} height={1774} />

### Split view

Edit files side-by-side with split view. Click the **Split Layout** button in the editor toolbar to open a second editor panel. This is useful when you want to view v0's changes in diff view while making additional edits in another panel, or when working on related files like a component and its styles.

<Image alt="Split view with two files side by side" src="/docs/light/splitviewlight.png" srcDark="/dark/splitviewdark.png" width={3154} height={1774} />

### File management

You can create, rename, and delete files directly in the editor:

* **Create a file**: Click the new file icon in the File Explorer header, or right-click in the file tree
* **Create a folder**: Click the new folder icon in the File Explorer header, or right-click in the file tree
* **Rename a file**: Right-click on a file and select "Rename"
* **Delete a file**: Right-click on a file and select "Delete"

### Toolbar actions

The editor toolbar provides quick access to common actions:

* **Copy File**: Copy the current file's contents to your clipboard
* **Toggle Diff View**: Show or hide the diff view for the current file
* **Split Layout**: Toggle split view to edit two files side-by-side



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
