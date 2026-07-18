# masterofthepuppets.github.io

Personal site of Ahmed Y. Elmogy — security advisories and research write-ups.
Jekyll, built by GitHub Pages, served static.

## Adding an advisory

Create one file in `_advisories/`, named after the ID, lowercase:

    _advisories/aye-2026-0016.md

That single file produces both the detail page at `/advisories/aye-2026-0016/`
**and** the row on `/advisories/`. There is no second place to edit and no list
to keep in sync.

```yaml
---
advisory_id: AYE-2026-0016   # NOT `id` — see "Reserved keys" below
title: "Vendor Product Component Method Vulnerability Class Vulnerability"
cve: CVE-2026-00000          # leave the value empty if none is assigned
vendor: "Vendor"
product: "Product Name"
affected: "1.0 through 2.3"  # optional
fixed: "2.4 or later"        # optional
component: "Class.method() — /some/endpoint"   # optional
vuln_class: "Path Traversal" # NOT `class` — see "Reserved keys" below
cwe: CWE-22                  # optional
cvss: 7.5                    # optional
cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
date: 2026-08-01             # disclosure date — drives ordering and year grouping
coordination: "Dell PSIRT"
refs:
  - label: "Dell DSA-2026-999"
    url: https://www.dell.com/...
  - label: "NVD — CVE-2026-00000"
    url: https://nvd.nist.gov/vuln/detail/CVE-2026-00000
credit: "Verbatim acknowledgement text from the vendor advisory."
credit_url: https://www.dell.com/...
credit_source: "Dell DSA-2026-999"
writeup: /research/2026/some-slug/    # optional, if a post exists
---

Optional prose. Renders between the fact table and the credit block.
Leave it out and the page is just the facts.
```

Conventions worth keeping:

- **One CVE per file.** Vendor advisories often bundle several CVEs from several
  researchers; each of yours gets its own ID and page. Use the bundle's full
  acknowledgement text as `credit` and let `credit_source` name the advisory.
- **`title` follows the ZDI/srcincite pattern**: vendor → product → component →
  method → vulnerability class → "Vulnerability".
- **`credit` is quoted verbatim** from the vendor, and `credit_url` points at
  where it's published. That's what makes each page self-verifying rather than
  a claim.
- **IDs are permanent.** They're in the URL and meant to be cited. Never renumber.

### Reserved keys — don't use these in front matter

Jekyll exposes a document to Liquid through a `Drop`, and some names resolve to
the Drop's own methods instead of your front matter. They fail *silently* — you
get a plausible-looking wrong value, not an error:

| Don't use | Why | Use instead |
|---|---|---|
| `id` | `DocumentDrop` delegates it to the document's internal path-based id, so `page.id` renders `/advisories/aye-2026-0016` | `advisory_id` |
| `class` | Resolves on every Ruby object | `vuln_class` |
| `name`, `url`, `path`, `content`, `output`, `excerpt`, `next`, `previous`, `collection` | All defined on `DocumentDrop` | pick another name |

`date` is safe despite being delegated — the delegate returns the front matter
value.

## Writing a research post

Copy `_drafts/example-writeup.md` to `_posts/YYYY-MM-DD-slug.md` and write.
Files in `_drafts/` are never published.

## Local preview (optional)

GitHub Pages builds the site server-side, so this is only needed if you want to
see changes before pushing:

    bundle install
    bundle exec jekyll serve --drafts    # http://127.0.0.1:4000

## Notes

- **No JavaScript.** The Content-Security-Policy in `_layouts/default.html` is
  `default-src 'none'` with no `script-src`, so scripts cannot execute at all —
  and no external host can be contacted. If you ever add a script or an off-site
  asset, that policy has to be relaxed deliberately. Keep assets local.
- **No theme.** There's no `theme:` key in `_config.yml`; every layout in
  `_layouts/` is hand-written. Nothing is inherited from minima.
- **No inline styles**, for the same CSP reason. Add a class in `assets/site.css`.
- The whole palette lives in the `:root` block of `assets/site.css`. Dark mode
  follows the OS and has no toggle, because a toggle would need JavaScript.
