# Deploy Your Notes App — Step by Step

Total time: about 10 minutes.

---

## What you need
- A free GitHub account (github.com)
- A free Netlify account (netlify.com)

---

## Step 1 — Upload to GitHub

1. Go to **github.com/new**
2. Name the repo `notes-app` (or anything you like)
3. Leave it Public, click **Create repository**
4. On the next page, click **uploading an existing file**
5. Drag the entire contents of this zip into the upload area
6. Click **Commit changes**

---

## Step 2 — Deploy to Netlify

1. Go to **netlify.com** and sign in (or sign up free)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and authorise Netlify
4. Pick your `notes-app` repo
5. Leave all build settings as-is and click **Deploy site**
6. After ~30 seconds your site is live. Copy the URL (e.g. `https://sparkly-fox-abc123.netlify.app`)

---

## Step 3 — Create a GitHub OAuth App

This lets users sign in with their GitHub account — no tokens needed.

1. Go to **github.com/settings/developers**
2. Click **OAuth Apps → New OAuth App**
3. Fill in:
   - **Application name**: Notes App (or anything)
   - **Homepage URL**: your Netlify URL (e.g. `https://sparkly-fox-abc123.netlify.app`)
   - **Authorization callback URL**: `https://sparkly-fox-abc123.netlify.app/oauth/callback`
     *(replace with your actual Netlify URL)*
4. Click **Register application**
5. On the next screen, copy the **Client ID**
6. Click **Generate a new client secret** and copy it immediately
   *(you won't be able to see it again)*

---

## Step 4 — Add credentials to Netlify

1. In Netlify, go to your site → **Site configuration → Environment variables**
2. Click **Add a variable** and add these two:

   | Key | Value |
   |-----|-------|
   | `GITHUB_CLIENT_ID` | the Client ID from Step 3 |
   | `GITHUB_CLIENT_SECRET` | the Client Secret from Step 3 |

3. Click **Save**

---

## Step 5 — Add your site URL to the HTML

1. In your GitHub repo, open `public/index.html`
2. Find this line near the top of the `<head>`:
   ```html
   <meta name="gh-client-id" content="">
   ```
3. Add your Client ID:
   ```html
   <meta name="gh-client-id" content="YOUR_CLIENT_ID_HERE">
   ```
4. Commit the change — Netlify redeploys automatically

---

## Step 6 — Done!

Visit your Netlify URL. You should see the "Sign in with GitHub" button.

Users click it, authorise, and land straight in their notes. Each person's notes are saved to their own private `notes` repo on GitHub — fully separated, zero shared storage.

---

## Troubleshooting

**"OAuth not configured on server"**
→ Check that both environment variables are set in Netlify and that you redeployed after adding them.

**"Bad verification code"**
→ The OAuth code expired (they last 10 minutes). Try signing in again.

**Callback URL mismatch**
→ The callback URL in your GitHub OAuth App must match your Netlify URL exactly, including the `/oauth/callback` path.

**Notes don't load**
→ On first sign-in the app creates a private `notes` repo automatically. If something went wrong, create it manually at github.com/new with the name `notes`.
