---
layout: page
title: About
permalink: /about/
description: >-
  Ahmed Y. Elmogy — independent security researcher. Vulnerability research in
  enterprise management, storage and appliance software.
---

I'm an independent security researcher. I look for vulnerabilities in enterprise
software: management consoles, storage and backup appliances, and the web layers
bolted onto them.

Most of my findings cluster around file-handling and access-control flaws —
path traversal, unrestricted upload, improper authentication — and the routes
from those primitives to code execution on appliances that are rarely exposed to
outside scrutiny.

Reports are coordinated through vendor PSIRTs, the
[Trend Micro Zero Day Initiative](https://www.zerodayinitiative.com/) and
[SSD Secure Disclosure](https://ssd-disclosure.com/). Vendors I've reported to
include Dell, ATEN, PaperCut, Ivanti, TrustPort, ASUSTOR, QNAP and Red Hat.

Some findings are credited under the handle **prowser**; earlier
web-application work appeared under **mogyhacker**. Both are me.

Full list: [advisories]({{ '/advisories/' | relative_url }}).

## Recognition

- **Red Hat** — [Vulnerability Acknowledgements](https://access.redhat.com/articles/66234), 2015
- **QNAP** — [Security Bounty Program](https://www.qnap.com/en-me/security-bounty-program) acknowledgement, 2025

## Contact

{% if site.email -%}
Email: [{{ site.email }}](mailto:{{ site.email }})
{% else -%}
Reach me on [X / Twitter](https://x.com/{{ site.twitter_username }}) or
[GitHub](https://github.com/{{ site.github_username }}).
{% endif %}
For vulnerability reports concerning my own code, open an issue on the relevant
repository.
