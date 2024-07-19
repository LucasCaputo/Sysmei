self.addEventListener('push', (event) => {
  const title = 'Bom Dia!';
  const options = {
    body: 'Desejamos a você um ótimo dia!',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
