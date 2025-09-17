## Wankanda AI – Knowledge Base Search & Enrichment

This project is a rapid prototype for an AI-powered knowledge base search system, integrating **React**, **Node.js/Express**, **n8n**, **Supabase (Postgres with pgvector)**, and **OpenAI GPT-3.5-turbo**.

---

## Folder Structure

```
wandai/
├── .gitignore
├── README.md
├── chatbot_n8n_webhook.json         # n8n workflow for chatbot Q&A
├── read_pdf_n8n_webhook.json        # n8n workflow for PDF ingestion
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── UploadDropzone.js
│   │   │   ├── ChatInterface.js
│   │   │   ├── ChatMessage.js
│   │   │   ├── Sections.js
│   │   │   └── Icons.js
│   │   └── services/
│   │       └── api.js
│   └── build/                      # Production build output
├── server/
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── setupEnv.js
│       ├── controllers/
│       │   └── ragController.js
│       └── routes/
│           └── api.js
```

---

## System Architecture & Flow

### 1. **Document Ingestion (PDF Upload)**
- **Frontend**: User drags & drops PDF/DOCX files in the React UI (`client/src/App.js`).
- **Backend**: Files are sent to `/api/upload` (`server/src/routes/api.js`), which proxies the request to the n8n ingestion webhook (`N8N_INGEST_WEBHOOK_URL`).
- **n8n Workflow** (`read_pdf_n8n_webhook.json`):
	- Receives files via webhook.
	- Extracts text from PDFs.
	- Splits text into chunks.
	- Generates vector embeddings using OpenAI.
	- Stores embeddings in Supabase/Postgres (pgvector).
- **Result**: Uploaded documents are now indexed for semantic search.

### 2. **Question Answering (Chatbot)**
- **Frontend**: User asks questions in natural language via the chat interface (`client/src/App.js`).
- **Backend**: Questions are sent to `/api/query` (`server/src/routes/api.js`), which proxies to the n8n chatbot webhook (`N8N_QUERY_WEBHOOK_URL`).
- **n8n Workflow** (`chatbot_n8n_webhook.json`):
	- Receives question and session ID.
	- Uses OpenAI GPT-3.5-turbo as the LLM.
	- Retrieves relevant document chunks from the vector store (semantic search).
	- Answers strictly based on the uploaded documents.
	- If the answer cannot be found in the documents, responds:  
		**"I couldn't find this in the document."**
- **Result**: User receives trusted, document-grounded answers with citations.

---

## Features

- **Drag-and-drop upload** for PDF/DOCX files.
- **Document ingestion** via n8n workflow to Supabase/Postgres vector DB.
- **Natural language Q&A** using OpenAI GPT-3.5-turbo, strictly limited to uploaded document content.
- **Source citations** and confidence gauge (if provided by workflow).
- **Recent uploads** and chat history in UI.

---

## Setup

### Prerequisites
- Node.js 18+
- n8n running locally or hosted
- Supabase/Postgres with pgvector extension

### 1. Backend

```sh
cd server
cp .env.example .env
npm install
npm run dev
```

Set `.env`:
```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
N8N_INGEST_WEBHOOK_URL=http://localhost:5678/webhook/ingest
N8N_QUERY_WEBHOOK_URL=http://localhost:5678/webhook/query
```

### 2. Frontend

```sh
cd client
npm install
npm run dev
```

---

## n8n Workflow Contracts

 **Ingestion Webhook**
- **Endpoint**: `N8N_INGEST_WEBHOOK_URL`
- **Request**: `multipart/form-data` with multiple `files`
- **Response Example**:
	```json
	{ "upload": "success" }
	```

### **Query Webhook**
- **Endpoint**: `N8N_QUERY_WEBHOOK_URL`
- **Request**:
	```json
	{ "question": "What is our refund policy?", "sessionId": "..." }
	```
- **Response**:
	- If answer found:  
		`{ "answer": "..."`
	- If not found:  
		`"I couldn't find this in the document."`

---

## Build for Production

- **Frontend**:  
	`cd client && npm run build`
- **Backend**:  
	Serves `client/build` automatically in production  
	`cd server && npm run start`

---

## Design Decisions

- **Backend proxy** hides webhook URLs, handles CORS, and normalizes responses.
- **n8n** orchestrates RAG (Retrieval-Augmented Generation) flows for ingestion and Q&A.
- **Strict document grounding**: Chatbot answers only from uploaded documents.
- **Minimal persistence** for demo; add authentication/rate limiting for production.

---

## Demo Flow

1. **Upload PDF/DOCX** via UI.
2. **Files ingested** and indexed in Supabase/Postgres via n8n.
3. **Ask questions** in chat; receive answers strictly from uploaded documents.
4. **If question is not covered**, chatbot replies:  
	 > "I couldn't find this in the document."

