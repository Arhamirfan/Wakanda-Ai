import React from 'react'

export default function UploadDropzone({ isDragging, onDragOver, onDragLeave, onDrop, onChange, accept }) {
  return (
    <div
      className={`dropzone ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div style={{ fontSize: 14, opacity: 0.9 }}>Drag & drop files here</div>
      <div style={{ fontSize: 12, color: '#8ea0be', marginTop: 4 }}>or click to select</div>
      <input type="file" multiple accept={accept} onChange={onChange} />
    </div>
  )
}


