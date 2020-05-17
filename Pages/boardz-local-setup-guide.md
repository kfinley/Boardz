# Boardz.app Local Setup Guide


This guide will walk you through how to setup a local environment to interact with the repository as well as run the system. 

Once setup you'll be able do the following:

- Run the Boardz.app system locally [ToDo]
- Manage Boardz.app Portal CMS content
- Manage Boardz.app Mind Maps [ToDo]

## Requirements

- Git
- Node
- VSCode
- VSCode Extensions
- Docker
- MindNode (Free version)

## VSCode Extensions

Currently Pages on the Boardz.app site will be using a simple GitHub style CSS. Installing the 
[Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles) VSCode extension helps for editing pages.

## Clone and Open in VSCode

Open a command line and navigate to a directory where you'd like to place the repository folder. Such as $HOME/projects.

Clone the repository then change directory into the repository and finally open the folder in VSCode using the following commands:

    $ git clone https://github.com/kfinley/Boardz.git
    $ cd Boardz
    $ Code .

## Manage Boardz.app Portal CMS

All the site Pages are under the Pages folder. Each page is a Markdown file. The name of the file is the url slug for the Page on the Boardz.app site. Each page file name should be all lowercase, standard letters & numbers, dashes in place of spaces (no underscores for now...), and dates using the YYY-MM-DD format.

When editing a page use the preview pane to assist with editing.

### Markdown

Pages use markdown. Refer to the [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) as a reference for writting Markdown.

### Adding / Editing Content

1. Create a Branch for your content 

```
$ git checkout -b '{action}-content-{name}
```

{action} shoiuld be add | edit
{name} should a short name of the file (with no spaces. use dashes for spaces).

Example branche Name: ```edit-content-privacy-policy```

2. Stage and Commit Changes

Once you're ready to submit your changes you will stage them and commit them to your local copy of the repository using the following command:

    $ git add .
    $ git commit -m '{action} Content: {short message with details of changes}'

3. Push changes

Now that your local changes have been committed to your repository you will ```push``` them to the GitHub hosted Boardz repository using the following command.

    $ git push

You may be prompted to set the remote origion using the additional parameters ```--set-upstream origin```. This is normal. 

4. Pull Request (PR)

Once you've pushed your changes login to the GitHub repository and create a Pull Request (PR) from your new branch into the ```master``` branch.

In the 'Open a publl request' page you'll choose ```master``` as the base branch and your new branch with changes as the compare branch.

Once the PR has been created it will be peer reviewed and if any issues are found requests for changes will be made.

