import React from 'react'

export function IconUpload({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 15v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4" stroke="#6c7cff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 3v10" stroke="#00e0ff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="m8 7 4-4 4 4" stroke="#00e0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function IconSpark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2Z" fill="#00e0ff" opacity="0.9"/>
      <circle cx="19" cy="5" r="2" fill="#6c7cff" opacity="0.9"/>
      <circle cx="5" cy="6" r="1.5" fill="#6c7cff" opacity="0.7"/>
    </svg>
  )
}


