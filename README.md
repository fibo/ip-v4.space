# ip-v4.space

> IPv4 space visualization

## Development

### Setup

Install deps and build

```bash
npm install
npm run build
```

Start dev server

```bash
npm start
```

Optionally start sass in watch mode to edit CSS

```bash
npm run sass_watch
```

### Deploy

AWS environment variables are required

```bash
export AWS_ACCESS_KEY_ID=AKIA***
export AWS_SECRET_ACCESS_KEY="xxx***"
export export AWS_DEFAULT_REGION=us-east-1
```

Upload the whole app to S3.

```bash
npm run deploy
```

Go to [Cloudflare Development mode](https://www.cloudflare.com/a/caching/ip-v4.space#development_mode) and disable cache to see results instantly.

### Cache

[Caching Level on Cloudflare](https://www.cloudflare.com/a/caching/ip-v4.space#cache_level) is set to *Ignore Query String* so it

> Delivers the same resource to everyone independent of the query string.

[Browser Cache Expiration on Cloudflare](https://www.cloudflare.com/a/caching/ip-v4.space#browser_cache_ttl) is set to 1 month.

