const express = require('express');
const app = express();

// Static files
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css') || path.endsWith('.js')) {
            res.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (path.endsWith('.txt')) {
            res.set('Cache-Control', 'public, max-age=60');
        }
    }
}));
  

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

app.get('/api/data', (req, res) => {
    res.json({
        time: new Date(),
        message: 'API response with NO cache'
    });
});

app.get('/api/time', (req, res) => {
    res.set('Cache-Control', 'public, max-age=10, must-revalidate');
    res.json({ serverTime: new Date().toISOString() });
});

app.get('/api/private', (req, res) => {
    res.set('Cache-Control', 'private, no-store');
    res.json({ secret: 'You should never cache this!' });
});
  
app.get('/api/etag', (req, res) => {
    const response = { message: "ETag demo", rand: Math.floor(Math.random() * 1000) };
    const etag = `"${Buffer.from(JSON.stringify(response)).toString('base64')}"`;
    res.set('ETag', etag);

    if (req.headers['if-none-match'] === etag) {
        res.status(304).end();
    } else {
        res.json(response);
    }
});
  
const lastModified = new Date().toUTCString();

app.get('/api/lastmodified', (req, res) => {
    res.set('Last-Modified', lastModified);

    if (req.headers['if-modified-since'] === lastModified) {
        res.status(304).end();
    } else {
        res.json({ message: "Last-Modified demo", modified: lastModified });
    }
});
