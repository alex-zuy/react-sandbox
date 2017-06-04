const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const htmlTemplate = fs.readFileSync(path.resolve(__dirname, 'app/index.html'));

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const themeName = query.theme || 'green';

    res.setHeader('Content-Type', 'text/html');
    res.write(htmlTemplate.toString().replace('$stylesheetLink', `dist/styles-${themeName}.css`));
    res.end();
});

server.listen(4050);
