/* PM2 process definition — keeps the Next.js server alive across crashes
   and reboots on the Hostinger VPS.

   Next binds to 127.0.0.1 on purpose: nginx is the only thing that should be
   reachable from outside, so nobody can hit port 3000 directly and bypass
   TLS, rate limits or the security headers.

   Start:   pm2 start ecosystem.config.js --env production
   Reload:  pm2 reload verant           (zero-downtime)
   Logs:    pm2 logs verant */

module.exports = {
  apps: [
    {
      name: "verant",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",

      // Fork mode with one worker suits the small VPS tiers. To use more
      // cores: exec_mode "cluster" and instances "max" — Next.js supports it.
      exec_mode: "fork",
      instances: 1,

      autorestart: true,
      max_restarts: 10,
      min_uptime: "20s",
      // Restart if the process balloons; a leak shouldn't take the box down.
      max_memory_restart: "512M",

      env_production: {
        NODE_ENV: "production",
        PORT: "3000",
      },

      out_file: "logs/out.log",
      error_file: "logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
