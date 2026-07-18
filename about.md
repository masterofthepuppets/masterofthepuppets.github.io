---
layout: page
title: About
permalink: /about/
description: >-
  Ahmed Y. Elmogy — independent security researcher. Vulnerability research in
  enterprise software and web applications.
---

I'm an independent security researcher that's been working since 2015. I hunt for vulnerabilities, 
mainly in enterprise software and web applications, but my skills span everything that's hackable.

Reports are coordinated through coordinated disclosure platforms like
[Trend Micro Zero Day Initiative](https://www.zerodayinitiative.com/) and
[SSD Secure Disclosure](https://ssd-disclosure.com/) or bug bounty platforms like Bugcrowd. Vendors I've reported to
include Dell, Intel, ATEN, PaperCut, Ivanti (somehow, I was the first step in the Ivanti's "Avalanche"), TrustPort, ASUSTOR, QNAP and Red Hat.

Some findings are credited under the handle **prowser**; earlier
web-application work appeared under **mogyhacker**. Both are me.

Full list: [advisories]({{ '/advisories/' | relative_url }}).

## Halls of fame

Aside from the CVEs, I've collected a number of vendor halls-of-fame and
security acknowledgements over the years — mostly web bugs (XSS, CSRF, OAuth vulnerabilities and
access-control issues) that never warranted a CVE. Not a big deal, but part of
the record: Facebook, PayPal, Optimizely, Buffer, Intel, Vimeo, 
United Airliens, BlackBerry, SAP Concur, Stellantis, Deutsche
Telekom, Hootsuite, ConvertKit, Vyond, HOVER, QNAP and Red Hat.

Several of the bug-bounty credits are on my
[Bugcrowd profile](https://bugcrowd.com/h/{{ site.bugcrowd_username }}); a few
sit on the vendors' own pages —
[Red Hat](https://access.redhat.com/articles/66234),
[Telekom](https://www.telekom.com/en/company/data-privacy-and-security/news/acknowledgements-358300),
[QNAP](https://www.qnap.com/en-me/security-bounty-program),
[Vyond](https://help.vyond.com/hc/en-us/articles/17221671439764-How-do-I-Report-a-Security-Vulnerability),
[BlackBerry](https://www.blackberry.com/en/secure-communications/services/psirt), and 
[Hootsuite](https://www.hootsuite.com/security).

## Contact

{% if site.email -%}
Email: [{{ site.email }}](mailto:{{ site.email }})
{% else -%}
Reach me on [X / Twitter](https://x.com/{{ site.twitter_username }}),
[GitHub](https://github.com/{{ site.github_username }}) or
[Bugcrowd](https://bugcrowd.com/h/{{ site.bugcrowd_username }}).
{% endif %}
