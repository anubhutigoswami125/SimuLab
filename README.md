# SimuLab — The Virtual Field Lab

SimuLab is a botanical scrapbook-inspired, point-and-click virtual biotechnology laboratory. Explore the room, open a bench, run interactive scientific simulations, record observations in your field notebook, and consult LabMate AI.

## Current prototype

- Clickable laboratory room with microbiology, biochemistry, and genetics/data benches.
- Ten interactive learning experiments: bacterial growth, serial dilution, Gram staining, enzyme kinetics, buffer and pH, protein assay, Mendelian crosses, gel electrophoresis, DNA sequence comparison, and biological data exploration.
- Session field notebook with downloadable notes.
- LabMate AI chat interface with a server-side API route.
- Responsive warm-paper, tan, olive and botanical design.

## Deploy with AI

1. Import this repository into Vercel.
2. Add \`OPENAI_API_KEY\` as an environment variable in project settings. Never commit the key to Git.
3. Optionally set \`OPENAI_MODEL\` to a model available to your API account; the default is \`gpt-4o-mini\`.
4. Deploy and test the \`/api/chat\` endpoint.

AI calls require an API account with available usage/billing. The front-end simulations do not depend on AI availability.

## Hosting note

GitHub Pages serves static files and cannot execute \`api/chat.js\`. It can host the static front end, but the AI route needs a separate serverless/backend deployment. For one deployment where the interface and AI route work at the same origin, use a host that supports both static assets and server functions, such as Vercel.

## Scientific scope

These are illustrative educational models, not validated laboratory instruments. Simulated outputs must not be represented as real experimental measurements. Real wet-lab activities require appropriate supervision, validated protocols, and institutional safety practices.
