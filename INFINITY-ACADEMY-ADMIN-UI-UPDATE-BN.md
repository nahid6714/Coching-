# Infinity Academy — Admin UI Update

## যা পরিবর্তন করা হয়েছে
- LakeBazar-এর মতো fixed dark sidebar, active menu state, মোবাইল slide-out drawer, sticky white top bar, workspace heading এবং উন্নত summary card যোগ করা হয়েছে।
- বিদ্যমান `/admin` পেজের ভর্তি আবেদন, শিক্ষার্থী, কোর্স/ব্যাচ এবং শিক্ষক ট্যাব রাখা হয়েছে।
- বর্তমান Next.js/React কাঠামো, demo data এবং Local Storage-ভিত্তিক কাজ অপরিবর্তিত রাখা হয়েছে।
- নতুন database, API, PHP বা cPanel backend যোগ করা হয়নি।

## যাচাই
- সোর্স ZIP extract করে পরীক্ষা করা হয়েছে।
- সব ২২টি TypeScript/TSX ফাইলের syntax transpilation check সফল হয়েছে।
- `npm install --ignore-scripts --no-audit --no-fund` সময়সীমা অতিক্রম করায় production build চালানো যায়নি। Vercel-এ deploy করার আগে `npm install` এবং `npm run build` চালিয়ে পরীক্ষা করুন।

## গুরুত্বপূর্ণ
- এটি admin UI পরিবর্তন; Local Storage-এর সীমাবদ্ধতা একই আছে এবং ডেটা বিভিন্ন ডিভাইসে share হবে না।
- বিদ্যমান demo/admin authentication সীমাবদ্ধতা এই UI update-এ পরিবর্তন করা হয়নি।
