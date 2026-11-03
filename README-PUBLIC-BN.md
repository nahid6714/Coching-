# Infinity Academy — Public Website Package

এই ZIP-এ দুটি অংশ আছে:

- `public_html/` — cPanel-এর ওয়েব রুটে রাখার জন্য প্রস্তুত Apache `.htaccess`।
- `frontend-source/` — আসল Next.js frontend source project। এটি আগে build করে static export তৈরি করতে হবে।

## গুরুত্বপূর্ণ: এখনই পুরো ZIP `public_html`-এ extract করবেন না

`frontend-source/`-এ Next.js source code আছে। এটি সরাসরি `public_html/`-এ রাখবেন না। এতে TypeScript/React source ফাইল public হয়ে যাবে এবং ওয়েবসাইটও static export হিসেবে চলবে না।

## Static website তৈরি করার ধাপ

1. নিজের কম্পিউটারে `frontend-source/` ফোল্ডারটি খুলুন।
2. `.env.example` কপি করে `.env.production.local` নামে রাখুন।
3. `.env.production.local`-এ API URL বসান:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

4. Node.js 20 বা তার পরের LTS সংস্করণ এবং npm ব্যবহার করে চালান:

```bash
npm install
npm run typecheck
npm run build
```

5. Build সফল হলে `frontend-source/out/` তৈরি হবে। `out/`-এর **ভেতরের সব ফাইল ও ফোল্ডার** cPanel-এর `public_html/`-এ আপলোড করুন।
6. এই ZIP-এর `public_html/.htaccess` ফাইলটি যেন live `public_html/`-এ থাকে তা নিশ্চিত করুন। Next export-এর সঙ্গে থাকা `.htaccess` চাইলে সেটির জায়গায় ব্যবহার করতে পারেন।


## GitHub-এ Push করলে স্বয়ংক্রিয় Build

`frontend-source/.github/workflows/build-static.yml` workflow যোগ করা আছে। Lockfile না থাকলেও Build চালানোর জন্য workflow-তে `npm install` ব্যবহার করা হয়েছে। এই ফোল্ডারের কনটেন্ট GitHub repository-র root-এ আপলোড/commit করে `main` বা `master` branch-এ push করলে GitHub Actions স্বয়ংক্রিয়ভাবে `out/` তৈরি করবে।

প্রথমবার GitHub repository-র **Settings → Secrets and variables → Actions → New repository secret** থেকে এই secret যোগ করুন:

- Name: `NEXT_PUBLIC_API_URL`
- Value: আপনার Laravel API URL, যেমন `https://api.yourdomain.com/api`

তারপর **Actions** ট্যাবে গিয়ে `Build Infinity Academy frontend` workflow-এর সর্বশেষ run খুলুন। Build সফল হলে নিচে `infinity-academy-out` নামে Artifact পাবেন। সেটি download করে unzip করুন, তারপর তার ভেতরের ফাইলগুলো cPanel-এর `public_html/`-এ আপলোড করুন।

এটি স্বয়ংক্রিয়ভাবে Build করে Artifact তৈরি করে; cPanel-এ নিজে থেকে ফাইল আপলোড/deploy করে না। cPanel-এ স্বয়ংক্রিয় deploy চাইলে পরে FTP/SFTP credentials GitHub Secrets-এ নিরাপদভাবে রেখে আলাদা deploy workflow যোগ করতে হবে। Secret কখনো কোডে লিখবেন না।

## কোন ফাইল কোথায় যাবে

```text
/home/CPANEL_USERNAME/
├── public_html/              ← out/ ফোল্ডারের ভেতরের ফাইলগুলো
└── private/                  ← আলাদা Private ZIP থেকে Laravel backend
```

শুধু `public_html/`-এ static build output থাকবে। `frontend-source/`-কে `public_html/`-এর ভেতরে আপলোড করবেন না।

## এই প্যাকেজের বর্তমান সীমাবদ্ধতা

- এই ZIP-এ আগে থেকে তৈরি `out/` production build নেই। npm dependency install এই কাজের পরিবেশে timeout হওয়ায় build যাচাই করা যায়নি। তাই build করে `out/` আপলোড করতে হবে।
- Frontend-এর API URL build-time environment variable। API domain বদলালে আবার build করতে হবে।
- Backend/API চালু এবং CORS ঠিক না করা পর্যন্ত ডাটাবেজ-নির্ভর অংশগুলো live data দেখাবে না।

## নিরাপত্তা

Frontend-এ শুধু `NEXT_PUBLIC_API_URL` রাখা যাবে। Database password, Laravel `APP_KEY`, admin password বা Gemini API key কখনো frontend-এ রাখবেন না। এগুলো Private ZIP-এর `.env`-এ থাকবে।

## আপডেট নোট

- `NEXT_PUBLIC_API_URL` না দিলে production build এখন ইচ্ছাকৃতভাবে ব্যর্থ হবে (ভুল URL নীরবে বসবে না)। `npm run lint` স্ক্রিপ্ট ও ভাঙা ESLint কনফিগ সরানো হয়েছে; `npm run typecheck` চালান।
- `.htaccess`-এ `ErrorDocument 404 /404.html` যোগ হয়েছে।
