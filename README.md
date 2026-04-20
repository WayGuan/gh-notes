# Notes App

A clean, fast note-taking app that stores your notes as Markdown files in your own GitHub repo.

## Features
- Sign in with GitHub — no passwords or tokens
- Notes saved as `.md` files in a private GitHub repo
- Full version history via git
- Search, filter by tag, sort
- Pin important notes
- Works on mobile

## Deploy
See [DEPLOY.md](./DEPLOY.md) for full instructions (~10 minutes).

## Todo

### Image support
Allow users to attach images to notes, stored in their own GitHub repo with no external service needed.

**Flow:**
1. User picks an image file in the note editor
2. App uploads it to the `notes/` folder via the GitHub API (base64 encoded)
3. App inserts a Markdown image reference into the note body: `![](https://raw.githubusercontent.com/username/notes/main/notes/image.png)`
4. Note body renders Markdown so the image displays inline

**What's needed:**
- File picker button in the composer and card editor
- GitHub API call to upload binary files (same PUT `/contents/` endpoint already used for notes)
- Markdown rendering in the note body view (currently displays raw text)

## Project structure
```
notes-app/
├── public/
│   └── index.html          # The entire frontend
├── netlify/
│   └── functions/
│       └── oauth.js        # OAuth token exchange (serverless)
├── netlify.toml            # Netlify build config
├── DEPLOY.md               # Step-by-step deployment guide
└── README.md
```
