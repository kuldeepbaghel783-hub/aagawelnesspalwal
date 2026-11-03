# AAGA Wellness – Next.js website

## Requirements
- Node.js 20 LTS recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Before publishing
1. The supplied AAGA logo is already included at `public/aaga-logo.png` (transparent background) and integrated into the header and footer.
2. Replace the practitioner placeholder with the real name, qualifications, registration details (where applicable), and approved photograph.
3. Confirm every service is currently offered by the clinic.
4. Verify the clinic address, phone number, opening hours and WhatsApp number.
5. Two clinic-owned photographs are included: `public/aaga-clinic-interior.jpg` and `public/aaga-opd.jpg`. Replace remaining stock treatment imagery with authentic photos when available.
6. Add a real privacy policy and have healthcare copy reviewed by the qualified practitioner.
7. Connect a custom domain in Vercel and configure Google Search Console.

This is the frontend starter. Appointment requests currently open WhatsApp; no patient information is stored in a database.


## Backend and admin setup
See `README-BACKEND-SETUP.md` for MongoDB Atlas, admin credentials, API endpoints, security notes and deployment steps.


## Admin CMS
See `README-ADMIN-CMS.md` for protected admin access, MongoDB configuration and editable website sections.
