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

Upload the whole app to S3.

```bash
npm run deploy
```

To deploy modifications to markup, upload index.html and 404.html to S3.

```bash
npm run deploy_html
```

To deploy JavaScript and CSS, it will build first then upload to S3

```bash
npm run deploy_js
npm run deploy_css
```

To deploy media modifications, if any

```bash
npm run deploy_media
```

