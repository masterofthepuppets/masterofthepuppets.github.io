---
layout: post
title: "Vendor Product Component Vulnerability Class"
date: 2026-01-01 12:00:00 +0200
advisory: AYE-2026-0001      # optional — links the post back to the advisory page
cve: CVE-2026-00000          # optional — shown under the title
description: >-              # optional — one line, used on /research/ and in meta tags
  One-sentence summary of what the bug is and why it matters.
---

Files in `_drafts/` are never published. To publish this:

1. Copy it to `_posts/YYYY-MM-DD-some-slug.md` (the date prefix is required).
2. Edit the front matter above.
3. Write. Commit. Push.

Preview drafts locally with `bundle exec jekyll serve --drafts`.

## Formatting available to you

Standard GitHub-flavoured Markdown. Fenced code blocks get syntax highlighting
via Rouge, server-side — no JavaScript involved:

```java
public void writeFileToHttpServletResponse(String path, HttpServletResponse r) {
    File f = new File(baseDir, path);   // no canonicalisation
    // ...
}
```

Long lines inside code blocks scroll within the block; the page itself never
scrolls sideways. Tables work too, but wrap wide ones in
`<div class="table-scroll"> ... </div>` so they scroll rather than stretch the page.

Images go in `assets/` and are referenced as `![alt](/assets/thing.png)`. Keep
them local — the site's Content-Security-Policy blocks every off-site request,
so a hotlinked image will silently fail to load.
