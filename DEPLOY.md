# Deploying to a Hostinger VPS

This app is a Next.js **server** — it needs a live Node process for the pilot
form (`/api/pilot`), the signal feed (`/api/signals`) and the `/start?plan=`
page. A VPS runs it directly; PM2 keeps it alive and nginx puts it on ports
80/443 with TLS.

The same repo still deploys to Vercel unchanged — nothing here interferes.

## 1. One-time server setup

SSH in as a sudo user, then:

```bash
# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2
node -v          # expect v20.x
```

## 2. Get the code

```bash
sudo mkdir -p /var/www && sudo chown "$USER" /var/www
cd /var/www
git clone https://github.com/gabbyedgar/Verant.git verant
cd verant
git checkout claude/wizardly-babbage-9z8spw
```

## 3. Configure the environment

```bash
cp .env.example .env.production.local
nano .env.production.local     # fill in RESEND_API_KEY at minimum
```

`RESEND_API_KEY` is what makes signup emails actually arrive. Without it,
submissions are validated and logged but **never delivered**. See the README
for the Resend domain-verification steps.

`NEXT_PUBLIC_SITE_URL` is compiled into the build, so it must be set *before*
step 4 — not just before starting the server.

## 4. Build and start

```bash
npm ci                 # reproducible install from package-lock.json
npm run build
mkdir -p logs
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup            # prints one sudo command — run it, so PM2 survives reboot
```

Check it locally before wiring up nginx:

```bash
curl -I http://127.0.0.1:3000        # expect HTTP/1.1 200 OK
pm2 status
```

The app deliberately binds to `127.0.0.1` only, so port 3000 is unreachable
from the internet and every request has to come through nginx.

## 5. nginx + TLS

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/verant
sudo ln -s /etc/nginx/sites-available/verant /etc/nginx/sites-enabled/verant
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Point the domain's A record at the VPS IP, wait for DNS, then:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d verantintel.com -d www.verantintel.com
```

Certbot edits the nginx file to add the 443 block and the HTTP redirect, and
installs a renewal timer.

Lock the firewall to HTTP/HTTPS/SSH only:

```bash
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
```

## 6. Verify

```bash
curl -I https://verantintel.com                  # 200
curl -s https://verantintel.com/robots.txt       # URLs show the real domain
curl -s -o /dev/null -w '%{http_code}\n' \
  -X POST https://verantintel.com/api/pilot \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"you@example.com","company":"Test Co"}'
```

That last call returns `200` and should land an email in the inbox. A `502`
means delivery failed — check `pm2 logs verant` for the reason (usually an
unverified Resend sender domain).

## Deploying an update

```bash
cd /var/www/verant
./scripts/deploy.sh
```

The script pulls, installs, rebuilds and reloads with zero downtime. Doing it
by hand is the same four commands:

```bash
git pull --ff-only
npm ci
npm run build
pm2 reload verant
```

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| 502 Bad Gateway on every page | App isn't running. `pm2 status`, then `pm2 logs verant`. |
| Site loads but CSS is missing | Rebuild wasn't run after pulling. `npm run build && pm2 reload verant`. |
| `localhost:3000` in sitemap/OG tags | `NEXT_PUBLIC_SITE_URL` wasn't set at build time. Set it, rebuild. |
| Form returns 502 | Mail delivery failed — unverified sender domain or bad API key. `pm2 logs verant`. |
| Form returns 200 but no email | `RESEND_API_KEY` isn't set, so the lead was only logged. |
| Changes vanish after reboot | `pm2 save` and the `pm2 startup` command weren't run. |
