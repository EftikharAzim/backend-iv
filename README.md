# HTTP Cache-Control Demo

**A practical Node.js/Express project to learn and experiment with all major HTTP caching strategies.**

---

## 🚀 Features

- Demonstrates static and API caching via HTTP `Cache-Control` headers
- Shows use of `public`, `private`, `max-age`, `must-revalidate`, `no-store`, `immutable`
- ETag & Last-Modified conditional requests for cache validation
- Clean code for pushing to GitHub or running locally


## What This Shows
- Static file caching (`max-age`, `public`, `immutable`)
- API caching (`must-revalidate`, `no-store`, `no-cache`)
- ETag and Last-Modified (conditional requests)

---

## 🏁 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/cache-control-demo.git
cd cache-control-demo
npm install
node server.js
```

## How to Test
- Open DevTools → Network tab
- Watch for `Cache-Control`, `ETag`, `Last-Modified` headers
- Use curl/Postman for advanced tests

## References
- [MDN - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [HTTP Caching (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Express static docs](https://expressjs.com/en/api.html#express.static)
- [Chrome Ignores Cache-Control header] (https://stackoverflow.com/questions/11245767/is-chrome-ignoring-cache-control-max-age)
