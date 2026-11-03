# AAGA Website CMS and Admin Setup

## What the admin can manage
- Homepage hero: eyebrow, heading, supporting copy, hero image and CTA labels.
- About section: heading, description and clinic photo.
- Practitioner: display name, public title, biography, profile image and qualifications (only enter verified details).
- Treatments: add, edit, publish/unpublish, remove, update name/category/description/image.
- Clinic gallery: add/remove photos, update captions and image paths.
- Business contact: business name, transparent logo path, phone/WhatsApp, email, address and location line.
- Footer tagline.
- Enquiries: review contact requests and set New / Contacted / Booked / Closed.

## Admin protection
- `/admin` redirects to `/admin/login` without a valid signed session.
- `/admin/dashboard` is protected on the server and redirects unauthenticated users.
- Admin APIs verify the signed session before returning or changing protected data.
- No public admin registration route exists.
- Password is stored as a bcrypt hash in server environment variables.
- Session cookie is HttpOnly, SameSite=Strict, Secure in production and expires after 8 hours.

## Local setup
1. Extract the project and open the folder in VS Code.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add your MongoDB Atlas connection string to `MONGODB_URI`.
5. Set `ADMIN_EMAIL`.
6. Generate a password hash:

   ```bash
   node -e "require('bcryptjs').hash('YOUR_LONG_UNIQUE_PASSWORD', 12).then(console.log)"
   ```

   Put the output in `ADMIN_PASSWORD_HASH`.

7. Generate a session secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

   Put the output in `SESSION_SECRET`.

8. Start the website:

   ```bash
   npm run dev
   ```

9. Public site: `http://localhost:3000`
10. Admin: `http://localhost:3000/admin/login`

## Updating images through the admin
For an image already in the `public` directory, enter a path such as `/aaga-clinic-interior.jpg`.
For a hosted image, enter its full HTTPS URL. Use images owned by AAGA and ensure the host permits public embedding.

The current admin stores image paths/URLs; it does not upload image binaries. To add a new local image, copy it into `public/` and then enter its path in the CMS. For production Vercel deployments, use a permanent hosted image URL or add a managed media service.

## MongoDB
The CMS stores the website content as a single versioned document in MongoDB (`SiteContent`). Enquiries are stored separately (`Enquiry`). If MongoDB is not configured, the public website uses built-in default content; CMS saves and enquiry submissions require a working database.

## Before production
- Set environment variables in Vercel and redeploy.
- Configure MongoDB Atlas network access securely.
- Replace any demo/sample images with approved clinic-owned photos.
- Verify practitioner name, designation and qualifications before publishing.
- Have AAGA approve all treatment descriptions and privacy text.
- Use a shared rate limiter (for example, Redis/Upstash) for serverless production. The starter's basic limiter is per instance.
- Configure database backups, retention and deletion procedures.
- Do not collect medical histories or sensitive medical details through the public enquiry form.
