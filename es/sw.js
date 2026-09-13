/* Locale SW stub: register the shared root worker so old clients still upgrade cleanly. */
/* Prefer registering /sw.js from pages; this file remains for legacy registrations. */
try {
  importScripts('/sw.js');
} catch (e) {
  try { importScripts('../sw.js'); } catch (e2) { /* ignore */ }
}
