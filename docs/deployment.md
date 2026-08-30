# Deployment guide

This is a frontend-only Next.js project. Deploy the `frontend` directory to a Next.js-capable host such as Vercel.

## Vercel

1. Push this repository to your Git provider.
2. Import the repository into Vercel.
3. Set the project root directory to `frontend`.
4. Use the default build command: `npm run build`.
5. Deploy.

No backend environment variables or separate server are required. The optional `.env.local` file is reserved for public frontend configuration only and should not contain secrets.
