# Explore Overseas — Final MERN Project

A responsive visa-consultancy website with a cinematic Three.js aircraft intro, a self-generated rotating Earth, scroll-led destination experience, enquiry form, MongoDB API and protected admin dashboard.

## Tech stack
- Frontend: React 18, Vite, React Router, React Three Fiber / Three.js
- Backend: Node.js, Express, Mongoose
- Database: MongoDB Atlas or local MongoDB
- Admin authentication: bcrypt password hashing + JWT

## Requirements
- Node.js 20 or newer (LTS recommended) and npm
- MongoDB Atlas account or local MongoDB instance
- VS Code (recommended)

## Run locally on Windows
1. Extract the ZIP.
2. In VS Code, open the inner `explore-overseas-mern` folder (the folder containing this README and the root `package.json`).
3. Open Terminal → New Terminal and install packages:
   ```powershell
   npm install
   npm install --prefix server
   npm install --prefix client
   ```
4. Copy `server/.env.example` to `server/.env`. Fill in your own MongoDB connection string, a unique JWT secret (32+ random characters), and a strong admin password.
5. Check `client/.env.example`. The default API URL is `http://localhost:5000/api`; copy it to `client/.env` only if you need to change the default.
6. Start both apps from the project root:
   ```powershell
   npm run dev
   ```
7. Open the website at `http://localhost:5173`. The API health check is `http://localhost:5000/api/health`.

### If the root command does not start both apps
Open two terminals from the project root:
```powershell
npm run dev --prefix server
```
and
```powershell
npm run dev --prefix client
```

## Admin dashboard
- Login page: `http://localhost:5173/admin/login`
- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` before the first server start.
- The first server start creates the admin account if it does not already exist. Changing the env password later does not automatically change an existing admin account.

## MongoDB setup
1. Create a MongoDB Atlas cluster and database user.
2. Allow your current development IP under Network Access.
3. Copy the MongoDB driver connection string into `MONGODB_URI` in `server/.env`.
4. URL-encode special characters in the database password (for example, `@` becomes `%40`).
5. Keep `.env` files private. Never send them in screenshots, upload them to GitHub, or include them in a client ZIP.

## Customise before presenting to the client
Edit `client/src/data/site.js` and replace the demo phone number, email, office address, founder name and experience with verified company information. Do not publish placeholder contact details or unverified claims. Review the service wording, privacy notice and destination images with the company.

## Included features
- Home, About, Services, Destinations and Contact sections
- Destinations: USA, Canada, UK, Australia, Europe, New Zealand, Japan and South Korea
- Custom procedural 3D passenger aircraft intro with Explore Overseas branding and a 12-second flyby/reveal timeline
- Three.js rotating Earth with procedurally generated stylised continent texture (no remote Earth texture file required)
- Scroll-led sticky journey scene and reveal-on-scroll content sections
- Responsive navigation and enquiry form
- Express API with MongoDB enquiry storage
- Admin login, protected dashboard, enquiry search/filter/status management
- API rate limiting, Helmet security headers and basic request validation

## Production build check
After installing dependencies, run from the project root:
```powershell
npm run build
```
The production frontend output is generated in `client/dist`. This package was prepared with source files and configuration; a successful production build has **not** been confirmed in this environment because package installation did not complete here. Run the build on your computer before public deployment.

## Before public launch
- Replace all demo contact/company details.
- Rotate any database/admin credentials that may have been exposed in screenshots or chats.
- Set a strong unique `JWT_SECRET`; never use the example value.
- Configure production `CLIENT_URL`, frontend `VITE_API_URL`, HTTPS and hosting environment variables.
- Add a privacy policy and explicit consent wording; configure email/WhatsApp notifications if needed.
- Test enquiry submission, admin login and status updates on the deployed environment.
- Do not promise visa approval. Final decisions belong to the relevant immigration authorities.

## Notes on visuals
The aircraft is an original procedural 3D model built from Three.js geometry, not a photorealistic airline GLB. The Earth texture is generated in-browser and is intentionally stylised rather than a satellite photograph. The destination/hero photography and Google Fonts are loaded from external services and therefore need an internet connection.
