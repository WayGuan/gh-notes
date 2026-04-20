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
