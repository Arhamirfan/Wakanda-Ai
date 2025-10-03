import React, { useCallback, useState } from 'react'
import { uploadFiles, queryQuestion } from './services/api'
import UploadDropzone from './components/UploadDropzone'
import ChatInterface from './components/ChatInterface'
import { Section, RecentUploads } from './components/Sections'
import { IconUpload, IconSpark } from './components/Icons'

export default function App() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [querying, setQuerying] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [queryError, setQueryError] = useState('')
  const [recentUploads, setRecentUploads] = useState([])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files || [])
    if (dropped.length > 0) {
      const allowed = dropped.filter(f => /\.(pdf|docx)$/i.test(f.name))
      const rejected = dropped.filter(f => !/\.(pdf|docx)$/i.test(f.name))
      if (rejected.length) {
        setUploadError('Only PDF and DOCX files are supported')
      }
      if (allowed.length) setFiles(prev => [...prev, ...allowed])
    }
  }, [])

  const onUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    setUploadError('')
    try {
      await uploadFiles(files);
      setRecentUploads((prev) => [
        ...files.map(f => f.name),
        ...prev
      ].slice(0, 10))
      setFiles([])
    } catch (err) {
      setUploadError(err.message || 'Upload error')
    } finally {
      setUploading(false)
    }
  }

  const onAsk = async () => {
    if (!question.trim()) return
    setQuerying(true)
    setQueryError('')
    
    // Add user message to chat
    const userMessage = question.trim()
    setMessages(prev => [...prev, { content: userMessage, isUser: true }])
    setQuestion('')
    
    try {
      const data = await queryQuestion(userMessage) 
      
      setMessages(prev => [...prev, { content: data, isUser: false }])
    } catch (err) {
      setQueryError(err.message || 'Query error')
      setMessages(prev => [...prev, { content: 'Sorry, I encountered an error. Please try again.', isUser: false }])
    } finally {
      setQuerying(false)
    }
  }

  return (
    <div className="container">
      <header className="hero">
        <div className="logo-row">
          <IconSpark />
          <span className="brand">Wankanda AI</span>
        </div>
        <div>
          <h1 className="headline">Knowledge Base. Reimagined.</h1>
          <p className="subtitle">Upload documents, ask in natural language, receive trusted answers with sources.</p>

        </div>
      </header>

      <Section title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconUpload size={22}/> Upload Documents</span>} right={<button disabled={uploading || files.length === 0} onClick={onUpload}>{uploading ? 'Uploading…' : 'Upload'}</button>}>
        <UploadDropzone
          isDragging={isDragging}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onChange={(e) => {
            const picked = Array.from(e.target.files || [])
            const allowed = picked.filter(f => /\.(pdf|docx)$/i.test(f.name))
            const rejected = picked.filter(f => !/\.(pdf|docx)$/i.test(f.name))
            if (rejected.length) setUploadError('Only PDF and DOCX files are supported')
            if (allowed.length) setFiles(prev => [...prev, ...allowed])
            e.target.value = ''
          }}
          accept=".pdf,.docx"
        />
        {files.length > 0 && (
          <div className="file-list">
            {files.map((f, i) => (
              <div className="file-item" key={`${f.name}-${i}`}>{f.name}</div>
            ))}
          </div>
        )}
        {uploadError && <div className="error">{uploadError}</div>}
      </Section>

      <Section title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSpark /> Chat with AI</span>}>

        {queryError && <div className="error">{queryError}</div>}
        {messages.length > 0 && <ChatInterface messages={messages} isTyping={querying} />}

        <div className="ask-row">
          <input
            className="question-input"
            placeholder="Ask in natural language…"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onAsk() }}
          />
          <button disabled={querying || !question.trim()} onClick={onAsk}>{querying ? 'Sending…' : 'Send'}</button>
        </div>
      </Section>

      <Section title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconUpload size={20}/> Recent Uploads</span>}>
        <RecentUploads items={recentUploads} />
      </Section>
      <footer>
        <a href="https://arhamirfan.lovable.app/" target="_blank" rel="noreferrer">Wand AI</a>
      </footer>
    </div>
  )
}


