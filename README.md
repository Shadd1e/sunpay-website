# SunPay Website

**Sun Jade Nigeria Limited**

Static website for SunPay — 4 pages, no build step required.

---

## File Structure

```
sunpay_website/
├── index.html          ← Landing page
├── merchant.html       ← Merchant interest page + form
├── terms.html          ← Terms of Use
├── privacy.html        ← Privacy Policy
├── css/
│   ├── global.css      ← Shared styles, nav, footer, typography
│   ├── index.css       ← Landing page styles
│   └── merchant.css    ← Merchant page styles
├── js/
│   └── main.js         ← Animations, form submission, nav
└── assets/
    ├── logo-dark.png   ← Logo for dark backgrounds (gold + white rays)
    └── logo-light.png  ← Logo for light backgrounds (gold + dark rays)
```

---

## Before Deploying

### 1. Add your logo files
Copy your logo images into the `assets/` folder:
- `assets/logo-dark.png` — the dark version (black background, gold + white rays)
- `assets/logo-light.png` — the light version

### 2. Update the Supabase anon key in js/main.js
Open `js/main.js` and find this line (~line 90):
```js
'apikey': 'YOUR_ANON_KEY',
```
Replace `YOUR_ANON_KEY` with your actual Supabase anon public key.
This is needed for the merchant interest form to submit to your database.

### 3. Update the Supabase URL if needed
In the same file, confirm the URL matches your project:
```js
const res = await fetch('https://ndvwrdunisfhvospvufo.supabase.co/functions/v1/merchant-lead', {
```

---

## Deployment Options

### Option A — Netlify (Recommended, Free)
1. Go to netlify.com and sign up
2. Drag and drop the entire `sunpay_website` folder onto the Netlify dashboard
3. Done — you get a free URL like `sunpay-xyz.netlify.app`
4. To use your custom domain (e.g. `sunpay.com.ng`):
   - In Netlify: Site Settings → Domain Management → Add custom domain
   - In Namecheap: Add a CNAME record pointing to your Netlify URL

### Option B — Vercel (Free)
1. Go to vercel.com and sign up
2. Click "Add New Project" → Import from GitHub
3. Push this folder to a GitHub repo first, then import
4. Or use Vercel CLI: `npx vercel --prod`

### Option C — GitHub Pages (Free)
1. Create a GitHub repository
2. Push all files to the `main` branch
3. Go to repo Settings → Pages → Source: Deploy from branch → main
4. Your site will be live at `yourusername.github.io/repo-name`
5. For custom domain: add a CNAME file with your domain name

### Option D — cPanel / Traditional Hosting
1. Log into your hosting control panel
2. Open File Manager → `public_html`
3. Upload all files maintaining the folder structure
4. Done

---

## Custom Domain Setup (Namecheap)

After deploying to Netlify/Vercel:

1. Log into Namecheap → Domain List → Manage your domain
2. Go to **Advanced DNS**
3. Add these records:

| Type  | Host | Value                        |
|-------|------|------------------------------|
| CNAME | www  | your-site.netlify.app        |
| ALIAS | @    | your-site.netlify.app        |

DNS propagation takes 10 minutes to 48 hours.

---

## Going Live Checklist

- [ ] Logo files added to `assets/`
- [ ] Supabase anon key added to `js/main.js`
- [ ] Test merchant form submits successfully
- [ ] Custom domain purchased and configured
- [ ] HTTPS is active (Netlify/Vercel handle this automatically)
- [ ] Update Terms and Privacy Policy dates when ready for launch
- [ ] Add real address for Sun Jade Nigeria Limited in Terms page
- [ ] When app goes live on stores, update the store badge links in `index.html`

---

## Updating Store Links When App Launches

In `index.html`, find the store badges section and replace the `<div>` tags with real `<a>` tags:

```html
<!-- Replace this: -->
<div class="store-badge store-badge--coming">

<!-- With this for Play Store: -->
<a href="https://play.google.com/store/apps/details?id=com.sunjade.sunpay" 
   class="store-badge" target="_blank">

<!-- And this for App Store: -->
<a href="https://apps.apple.com/app/sunpay/id000000000" 
   class="store-badge" target="_blank">
```

Also remove `store-badge--coming` class and update the "Coming soon on" text to "Download on".

---

## Contact

sunpayngltd@gmail.com
# sunpay-website
