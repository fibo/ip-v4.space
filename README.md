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

To deploy modifications to markup, upload index.html and 404.html to S3.

```bash
aws s3 cp index.html s3://ip-v4.space/index.html
aws s3 cp 404.html s3://ip-v4.space/404.html
```

To deploy JavaScript and CSS, build first then upload to S3

```bash
npm run build
aws s3 cp bundle.js s3://ip-v4.space/bundle.js
aws s3 cp style.css s3://ip-v4.space/style.css
```

To deploy media modifications, if any

```bash
aws s3 sync media s3://ip-v4.space/media
```
