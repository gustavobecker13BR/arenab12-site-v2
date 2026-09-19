// Service Worker — Arena B12 Financeiro
// Estratégia: network-first (sempre busca a versão mais nova; cache só como fallback offline)

const CACHE = 'arenab12-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instala e pré-carrega os arquivos essenciais
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

// Limpa caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Nunca cacheia chamadas ao Google Apps Script (sincronização sempre online)
  if (url.includes('script.google.com') || url.includes('script.googleusercontent.com')) {
    return; // deixa passar direto para a rede
  }

  // Network-first para o resto
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        // Atualiza o cache com a versão nova
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        return resp;
      })
      .catch(() => caches.match(e.request)) // offline → usa cache
  );
});
