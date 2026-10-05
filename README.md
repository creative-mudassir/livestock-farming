# Livestock Partnership Platform — Client Demo

Frontend-only React demo for SS-102. It has no login, no backend and no credentials. Every number comes from mock data in `src/data.js`.

## Run

```bash
npm install
npm run dev        # opens http://localhost:5173
```

## Build for hosting

```bash
npm run build      # output in dist/
```

Upload the `dist/` folder to any static host (Netlify drop, Vercel, cPanel `public_html`, Firebase Hosting). Routing is hash-based (`#/animals`), so the host needs no rewrite rules.

## Suggested demo flow

1. **Dashboard**: KPIs, sales vs expenses, livestock summary, milk, alerts, pregnancy attention, approvals
2. **Animal Registry**: filter or search, then click an animal to see its full profile, lifecycle, milk, P/L and media
3. **Breeding & Pregnancy**: the 90-day attention alert (B-102) and the delivery schedule
4. **Farmers & Khata**: click a farmer to see Zati Khata, Mushtarka Khata and linked animals
5. **Investors & Partners**: the profit-sharing formula with its live 100% check
6. **Stores & Inventory**, then **POS**: expiry and low-stock badges, then a live cart
7. **Field Officers & GPS**: map, field evidence and offline sync queue
8. **Approval Inbox**: approve or reject (maker-checker)
9. **Zakat & Ushr**: live calculators
10. **AI Assistant**: tap the Roman Urdu chips
11. **اردو** button (top bar): switches the menu to Urdu

## Change the sample data

Edit `src/data.js`. The company name and product name are in `company` at the top of that file.

## Live demo

https://creative-mudassir.github.io/livestock-farming/

Every push to `main` rebuilds the site and publishes it to the `gh-pages` branch (see `.github/workflows/deploy.yml`).
