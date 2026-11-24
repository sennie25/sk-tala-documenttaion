/* =====================================================================
   STORAGE LAYER – shared by index.html (participants) and admin.html.
   Demo version uses localStorage (data stays on ONE browser only).
   For real use, replace each function body with calls to your backend
   (Firebase / Supabase / your own Node, PHP or Laravel API).
   Participants should only be able to CREATE submissions;
   only a logged-in admin should be able to list / update / delete.
   ===================================================================== */
const KEY = "sktala_submissions";
const read = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const write = d => localStorage.setItem(KEY, JSON.stringify(d)); // throws if storage is full

// TODO: POST /api/submissions  (upload photos to file storage, save their URLs)
async function addSubmission(s) { const all = read(); all.unshift(s); write(all); return s; }
// TODO: GET /api/submissions   (admin only)
async function listSubmissions() { return read(); }
// TODO: PATCH /api/submissions/:id   (admin only)
async function updateSubmission(id, patch) { const all = read(); const s = all.find(x => x.id === id); if (s) Object.assign(s, patch); write(all); }
// TODO: DELETE /api/submissions/:id  (admin only)
async function deleteSubmission(id) { write(read().filter(x => x.id !== id)); }