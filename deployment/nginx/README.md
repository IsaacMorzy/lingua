# Nginx Deployment for ijlaps.ac.ke

This directory contains the production Nginx site configuration for the IJLAPS website (`ijlaps.ac.ke`).

## Architecture

- **Frontend**: Astro static site built into `lingua/www` and collected to Frappe's `sites/assets/lingua/frontend/`.
- **Backend**: Frappe/gunicorn running on `127.0.0.1:8000`.
- **Web server**: Nginx serves the Astro HTML pages directly from `lingua/www`, proxies Frappe routes (`/api`, `/app`, `/desk`, etc.) to gunicorn, and serves static assets directly.
- **SSL**: Let's Encrypt via Certbot.
- **CI/CD**: GitHub Actions workflow (`.github/workflows/deploy-frontend.yml`) builds the frontend on every push to `main`.

## Files

- `ijlaps.ac.ke.conf` — Nginx site configuration.
- `deploy-frontend.sh` — Local deployment script.
- `.github/workflows/deploy-frontend.yml` — GitHub Actions CI/CD workflow.
- `logrotate.conf` — Log rotation for Nginx access/error logs.

## Prerequisites

- Nginx installed.
- Certbot installed with the Nginx plugin (`certbot python3-certbot-nginx` on Debian/Ubuntu).
- Frappe bench running gunicorn on `127.0.0.1:8000`.
- DNS `A` and `AAAA` records for `ijlaps.ac.ke` and `www.ijlaps.ac.ke` pointing to this server.
- Commands below use `sudo`; run them as a user with sudo privileges (e.g., `granduser`).

## Installation

1. **Deploy the Astro frontend** (builds the site and collects Frappe assets):

   ```bash
   cd /home/grand/frappe-bench/apps/lingua
   ./deployment/deploy-frontend.sh
   ```

   This builds `lingua/frontend/` into `lingua/www/` and `lingua/public/frontend/`.

2. **Create the ACME challenge directory**:

   ```bash
   sudo mkdir -p /var/www/certbot
   ```

3. **Enable the Nginx site**:

   ```bash
   sudo ln -s /home/grand/frappe-bench/apps/lingua/deployment/nginx/ijlaps.ac.ke.conf /etc/nginx/sites-enabled/ijlaps.ac.ke
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **Obtain SSL certificates**:

   ```bash
   sudo certbot --nginx -d ijlaps.ac.ke -d www.ijlaps.ac.ke
   ```

   Certbot will automatically update the configuration file with the certificate paths and reload Nginx.

   After the first successful issuance, uncomment the `ssl_trusted_certificate` line in the config to enable OCSP stapling, then reload Nginx.

5. **Verify**:

   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   curl -I https://ijlaps.ac.ke
   ```

## Renewal

Certbot installs a systemd timer for automatic renewal. To test:

```bash
sudo certbot renew --dry-run
```

## CI/CD Deployment

The GitHub Actions workflow (`.github/workflows/deploy-frontend.yml`) builds the frontend on every push to `main` and produces artifacts for `lingua/www` and `lingua/public/frontend`.

To enable automatic deployment to the server:

1. Add the following secrets to the GitHub repository:
   - `DEPLOY_HOST` — e.g. `ijlaps.ac.ke`
   - `DEPLOY_USER` — e.g. `granduser`
   - `DEPLOY_SSH_KEY` — private SSH key with access to the server
   - `DEPLOY_HOST_KEY` — the server's SSH host key (one line from `~/.ssh/known_hosts`, e.g. `ijlaps.ac.ke ssh-ed25519 AAAAC3NzaC...`)

2. The workflow already uses `rsync`/`ssh`; no further changes are required.

## Health Check & Status

Nginx exposes two health endpoints and a status page:

- `/health/nginx` — returns `nginx ok` directly from Nginx.
- `/health/frappe` — proxies to Frappe's `frappe.ping` method.
- `/status` — HTML status page with links to the health endpoints.

```bash
curl https://ijlaps.ac.ke/health/nginx
curl https://ijlaps.ac.ke/health/frappe
curl https://ijlaps.ac.ke/status
```

## Log Rotation

Install the logrotate config to keep Nginx logs from filling the disk:

```bash
sudo cp /home/grand/frappe-bench/apps/lingua/deployment/nginx/logrotate.conf /etc/logrotate.d/ijlaps.ac.ke
sudo logrotate -d /etc/logrotate.d/ijlaps.ac.ke
```

## Troubleshooting

- **502 Bad Gateway**: Ensure gunicorn is listening on `127.0.0.1:8000` (`sudo ss -tlnp | grep 8000`).
- **Assets 404**: Run `bench build` and verify `sites/assets/lingua/frontend/` exists.
- **Mixed content**: Ensure `X-Forwarded-Proto` is set so Frappe returns `https://` URLs.
- **Static page 404**: Verify `lingua/www/` contains the built HTML and the Nginx `root` path is correct.
