## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Local Development

- You need to install nvm first, then run these command

```bash
$ nvm install
$ nvm use
```

- Starting local development

```bash
# Edit env
$ cp .env.example .env

# Start database local
$ docker compose -f docker-compose.local.yml up -d --build

# Install dependencies
$ pnpm install

# Run migration
$ pnpm db:run

# Start development watch mode
$ pnpm start:dev app-b
$ pnpm start:dev app-c
```
