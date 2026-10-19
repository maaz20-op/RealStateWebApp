# Real Estate Client

React + Vite + Tailwind + Redux Toolkit (RTK Query) frontend. JavaScript only.

## Run
```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:5173
npm run build          # production build
```

## Configure
Edit `.env` (see `.env.example`) and `src/config/businessConfig.js`. Everything marked PLACEHOLDER needs real content from the business owner. The WhatsApp number must be international format (e.g. `+15551234567`); the button stays hidden until it is valid.

## Backend contract this client expects (`VITE_API_BASE_URL`)
| Endpoint | Used by |
|---|---|
| `POST /auth/login`, `POST /auth/signup`, `POST /auth/logout` | Login, Signup, header (HttpOnly cookie session) |
| `GET /users/me` (user with `role`) | Auth context, route guards |
| `GET /properties` (query: `q, location, type, minPrice, maxPrice, sort=newest\|price_asc\|price_desc, page, limit, featured`) | Home, Properties |
| `GET /properties/:id` | Property details |
| `POST /properties` (multipart: fields + `images`, `amenities` repeated) | Create property (admin) |
| `PATCH/DELETE /properties/:id` | Wired in RTK Query, no UI yet |
| `POST /contact` | Contact form |

List responses may be a bare array or `{ data, total, pages }`. The backend must enforce admin permissions and ignore any `role` sent by clients.
