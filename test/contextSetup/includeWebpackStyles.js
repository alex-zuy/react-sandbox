var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/_karma_webpack_/styles.css';

document.body.insertBefore(link, document.querySelector('body>link:last-of-type'));
