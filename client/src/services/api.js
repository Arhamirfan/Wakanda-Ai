const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000'

export async function uploadFiles(files, extra = {}) {
  const form = new FormData()
  files.forEach((f) => form.append('files', f))
  Object.entries(extra).forEach(([k, v]) => form.append(k, v))
  const res = await fetch(`${API_BASE}/api/upload`, { method: 'POST', body: form })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export async function queryQuestion(question, options = {}) {
  const res = await fetch(`${API_BASE}/api/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  }) 
  if (!res.ok) throw new Error('Query failed')
  return res.json()
}


