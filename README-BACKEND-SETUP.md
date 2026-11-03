# AAGA backend, enquiries and admin dashboard

## Included
- MongoDB/Mongoose connection with connection reuse.
- `POST /api/enquiries` validates and saves appointment enquiries.
- Admin login: `POST /api/admin/login`.
- Admin session check: `GET /api/admin/session`.
- Admin logout: `POST /api/admin/logout`.
- Admin enquiry list: `GET /api/admin/enquiries`.
- Admin status update: `PATCH /api/admin/enquiries`.
- HttpOnly, Secure-in-production, SameSite=Strict signed session cookie (8-hour expiry).
- Password verification using bcrypt hash; no public admin registration.
- Zod validation and basic per-instance rate limiting.
- Admin UI at `/admin/login` and `/admin`.

## 1. Install packages

```bash
npm install
```

## 2. Configure MongoDB Atlas
1. Create a MongoDB Atlas cluster.
2. Create a database user with a strong password.
3. In Network Access, allow the deployment environment's outbound access. For initial local development, add your current IP address.
4. Copy the Node.js connection string.
5. Create `.env.local` in the project root and set `MONGODB_URI`.
6. Replace username/password and database name in the connection string. URL-encode special characters in the database password.

Do not commit `.env.local` or share its values in chat.

## 3. Configure the admin account

Generate a bcrypt password hash locally:

```bash
node -e "require('bcryptjs').hash('YOUR_LONG_UNIQUE_PASSWORD', 12).then(console.log)"
```

Generate a session secret (Node.js):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Put the outputs in `.env.local`:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD_HASH=the-bcrypt-hash
SESSION_SECRET=the-random-secret
```

Never put the plain admin password in source code or frontend environment variables. There is no public signup route.

## 4. Run and test

```bash
npm run dev
```

- Public website: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- After login: `http://localhost:3000/admin/dashboard`

Submit a test enquiry from `/contact`. It should be saved to MongoDB and appear in the admin dashboard. Use a test phone number and delete test data directly in Atlas if required.

## 5. Practitioner profile

The profile uses the supplied image and the confirmed name **Garima Mahajan**. No qualification, registration number, or medical designation is displayed. Do not add any such credential unless AAGA supplies and verifies it. Edit `data/practitioner.ts` for approved biography details.

## 6. Deployment
Add the same environment variables to Vercel Project Settings → Environment Variables, then redeploy. Add the production domain to MongoDB Atlas Network Access according to your deployment networking setup.

## Security / production notes
- Admin access is email + bcrypt password; there is no self-service signup.
- The session cookie is HttpOnly, SameSite=Strict and Secure in production.
- Basic rate limiting uses in-memory counters and is per server instance. For robust production protection across serverless instances, add a shared rate limiter (e.g. Upstash Redis) and consider a managed WAF.
- Add monitoring, backups, data retention/deletion procedures and a clinic-approved privacy notice before accepting real patient data.
- This enquiry form is for contact details and appointment requests only. Do not collect medical records or sensitive health details.
- This starter does not send email/SMS notifications and does not confirm appointments automatically.
