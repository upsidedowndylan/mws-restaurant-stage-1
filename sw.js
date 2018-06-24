self.addEventListener('install', e => {
    console.log('[Service Worker], Installing Service Worker ...', e);
    e.waitUntil(
        caches.open('static')
        .then(cache => {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/main.js',
                '/js/restaurant_info.js'
            ]);
        })
    );
});

self.addEventListener('activate', e => {
    console.log('[Service Worker], Activating Service Worker ...', e);
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if(response) {
                return response;
            } else {
                fetch(e.request)
                .then(res => {
                    caches.open('dynamic')
                    .then(cache => {
                        cache.put(e.request.url, res.clone());
                        return res;
                    })
                    .catch(err => {
                        //Handling errors
                    });
                });
            }
        })
    );
});
