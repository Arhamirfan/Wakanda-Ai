import React from 'react'

export function Section({ title, children, right }) {
  return (
    <section className="card-section" style={{ animation: 'pop .2s ease' }}>
      <div className="card-header">
        <h2>{title}</h2>
        <div>{right}</div>
      </div>
      {children}
    </section>
  )
}

export function RecentUploads({ items }) {
  return (
    <div className="list-grid">
      {(!items || items.length === 0) && <div className="muted">No uploads yet</div>}
      {items?.map((it, i) => (
        <div className="list-item" key={i}>{it}</div>
      ))}
    </div>
  )
}

// Removed QueryHistory and Settings as requested


