const CACHE_NAME = "fed-cache";
self.addEventListener("install", function (event) {
  self.skipWaiting();
});
// Fired when the Service Worker starts up
self.addEventListener("activate", function (event) {
  console.log("Service Worker: Activating....");
  console.log("caches.keys:" + caches.keys());
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (key) {
          if (key !== CACHE_NAME) {
            console.log("Service Worker: Removing Old Cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  //** 有連線過的都會加入cache*/
  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request);
        //offline 不要cache
        if (
          event.request.url.indexOf("offline") === -1 &&
          event.request.url.indexOf("chrome-extension") === -1
        ) {
          console.log(event.request.url);
          try {
            var cache = await caches.open("cache");
            cache.put(event.request.url, res.clone());
          } catch {}
        }

        return res;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});

self.addEventListener("refreshOffline", function (response) {
  return caches.open("offline2").then(function (cache) {
    return cache.put(offlinePage, response);
  });
});
self.addEventListener("push", function (event) {
  const message = event.data.text();
  // 显示通知
  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.content,
    })
  );
});
//推播的視窗點擊觸發
self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  const action = event.action;
  const link = notification.data.link;
  if (action !== "close") {
    if (link) {
      clients.openWindow(link);
    }
  }
  notification.close();
  console.log("notificationclick action is", action);
});
