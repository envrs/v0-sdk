# @docs/assets — Media & Asset Export

Assets exported from v0.app documentation pages.

## Downloaded Assets (valid binary files)

### Images (Design Systems 2.0)
| File | Source | Size |
|------|--------|------|
| design-systems-import-form-light.png | /docs/assets/docs-images/ | 176KB |
| design-systems-import-form-dark.png | /docs/assets/docs-images/ | 626KB |
| design-systems-skills-page-light.png | /docs/assets/docs-images/ | 674KB |
| design-systems-skills-page-dark.png | /docs/assets/docs-images/ | 626KB |
| design-systems-attach-skill-light.png | /docs/assets/docs-images/ | 144KB |
| design-systems-attach-skill-dark.png | /docs/assets/docs-images/ | 141KB |

### Videos
| File | Source | Size |
|------|--------|------|
| changelog-unified-publish-flow-2.mp4 | public.blob.vercel-storage.com | 3.8MB |

## Referenced But Not Downloadable (SSR/Protected)

The following assets are referenced in documentation but returned HTML pages when accessed via direct URL (v0.app uses Next.js SSR and serves assets via client-side routing or authenticated CDN):

### Images (referenced in docs but require browser/authenticated access)
- /docs/light/ai-models.png + /dark/ai-models.png
- /docs/light/chat-database.png + /dark/chat-database.png
- /docs/light/controls.png + /dark/controls.png
- /docs/light/design-element.png + /dark/design-element.png
- /docs/light/design-mode.png + /dark/design-mode.png
- /docs/light/design-prompt.png + /dark/design-prompt.png
- /docs/light/design-save.png + /dark/design-save.png
- /docs/light/diffviewlight.png + /dark/diffviewdark.png
- /docs/light/splitviewlight.png + /dark/splitviewdark.png
- /docs/light/switchlight.gif + /dark/switchdark.gif

### Videos (referenced in docs but require browser/authenticated access)
- /docs/videos/code editor.mp4
- /docs/videos/database-integrations.mp4
- /docs/videos/design-mode.mp4
- /docs/videos/project-settings.mp4
- /docs/videos/tailwind-config.mp4
- /docs/videos/design-systems-2-JO2JVwlSjIN3YNB4EHDFuMPeJhNHXD.mp4

## Directory Structure

```
@docs/assets/
├── images/
│   ├── docs-images/
│   │   ├── design-systems-import-form-light.png
│   │   ├── design-systems-import-form-dark.png
│   │   ├── design-systems-skills-page-light.png
│   │   ├── design-systems-skills-page-dark.png
│   │   ├── design-systems-attach-skill-light.png
│   │   └── design-systems-attach-skill-dark.png
│   ├── light/          (referenced only — not downloadable)
│   └── dark/           (referenced only — not downloadable)
├── videos/
│   ├── changelog-unified-publish-flow-2.mp4
│   └── (referenced only — not downloadable)
```

## Notes

- Successfully downloaded files are valid binary formats (PNG, MP4)
- Files with 91KB+ size and HTML content type were rejected as they were SSR pages
- To download the full asset set, access the v0.app docs in a browser and extract from the rendered page or Vercel CDN directly
