# Boardz Pages

This folder contains Boardz.app site content. 

Some pages are published and some are not. Currently the publishing and syncing process is manual. 

Updates can be made in the Boardz.app Portal or here. Currently any [Published](Published "Published in this context means the latest version in the Boardz.app Portal CMS") changes need to be merged into the repo manually.


### Steps to Publish

Install markdown if you don't already have it.

```npm install markdown-to-html -g```

1. Convert markdown to html

```markdown page-name.md > page-name.html```

2. Review / clean-up html

3. Copy html content to Boardz.app Portal

## ToDo

- Script merging published changes
- Scirpt publsihing md ==>> html ==>> CMS using the BO CLI