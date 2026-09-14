<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4464d1cf-c956-413e-b3ad-787216ce54f6

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Railway

Create a Railway service from this repository with its **Root Directory** set to
`frontend`. Set `VITE_API_URL` to the public URL of the deployed Django service,
including `/api`, for example `https://my-api.up.railway.app/api`.

For the Vercel deployment, set the same `VITE_API_URL` environment variable in
the Vercel project settings and redeploy. The public frontend URL is
`https://beating-odds-foundation-event-rsvp.vercel.app/`.

The frontend can be deployed independently as a static Vite site. The backend's
Railway configuration is kept in `backend/railway.toml`.
