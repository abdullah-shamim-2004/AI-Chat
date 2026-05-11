# 💬 AI Chat — Powered by Groq

[Live](https://ai-chat-nine-sigma.vercel.app/)


A full-stack AI chat application built from scratch with Next.js, Groq, and Prisma. Supports real-time streaming responses, Google and email authentication, and persistent conversation history.

---

## ✨ Features

- ⚡ **Streaming chat** — live AI responses powered by Groq (Llama 3.3 70B)
- 💬 **Chat history** — messages stay visible during the conversation
- 🔐 **Authentication** — Google OAuth and email/password login
- 💾 **Persistent conversations** — saved to PostgreSQL via Prisma
- 🌐 **Guest mode** — chat freely without signing in
- ⚠️ **Error handling** — graceful error messages when something goes wrong
- 📱 **Responsive UI** — works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| AI SDK | [Vercel AI SDK v5](https://sdk.vercel.ai) |
| LLM Provider | [Groq](https://groq.com) (Llama 3.3 70B) |
| Auth | [NextAuth v5](https://authjs.dev) |
| Database | [PostgreSQL](https://postgresql.org) via [Neon](https://neon.tech) |
| ORM | [Prisma 7](https://prisma.io) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Language | TypeScript |
| Deployment | [Vercel](https://vercel.com) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                   # Auth pages 
│   │   ├── login/page.tsx        # Login — email + Google
│   │   └── signup/page.tsx       # Signup
│   ├── (main)/                   # Protected main pages
│   │   ├── layout.tsx            # Main layout (sidebar goes here)
│   │   └── chat/page.tsx         # Chat page
│   └── api/
│       ├── auth/[...nextauth]/   # NextAuth handler
│       ├── chat/                 # Groq streaming endpoint
│       ├── conversations/        # CRUD for conversations
│       └── auth/signup/          # User registration
├── components/
│   ├── chat/
│   │   ├── chat-window.tsx       # Main chat component
│   │   ├── message-list.tsx      # Renders all messages
│   │   ├── message-bubble.tsx    # Single message bubble
│   │   ├── message-input.tsx     # Input box + send button
│   │   ├── typing-indicator.tsx  # AI thinking animation
│   │   └── copy-button.tsx       # Copy message to clipboard
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   └── db.ts                     # Prisma client singleton
├── types/
│   └── index.ts                  # Shared TypeScript types
└── prisma/
    └── schema.prisma             # Database models
```

---

## 🗄️ Database Schema

```
User
 └── has many Conversations
       └── has many Messages

User
 └── has many Accounts (Google, credentials)
 └── has many Sessions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A [Groq](https://console.groq.com) account (free)
- A [Neon](https://neon.tech) account (free)
- A [Google Cloud](https://console.cloud.google.com) project with OAuth credentials

---

### 1. Clone the repository

```bash
git clone https://github.com/abdullah-shamim-2004/AI-Chat
cd AI-Chat
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
# Database (Neon)
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="your_secret_here"
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

# Groq
GROQ_API_KEY="your_groq_api_key"
```

Also create `.env.local` with the same values — Next.js reads from here.

---

### 4. Generate AUTH_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### 5. Set up the database

```bash
npx prisma generate
npx prisma db push
```

---

### 6. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | [neon.tech](https://neon.tech) |
| `AUTH_SECRET` | Random secret for NextAuth | Generate with `crypto` |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID | [Google Cloud Console](https://console.cloud.google.com) |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret | [Google Cloud Console](https://console.cloud.google.com) |
| `GROQ_API_KEY` | Groq API key | [console.groq.com](https://console.groq.com) |

---

## 🔐 Authentication

The app supports two login methods:

**Google OAuth**
- One click sign in with Google account
- Profile picture and name pulled automatically

**Email + Password**
- Register with name, email and password
- Passwords hashed with bcrypt (12 rounds)
- Same account can link both methods later

**Guest mode**
- No login required to use the chat
- Messages are not saved when not logged in

---

## 🌐 API Routes

| Method | Route | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/chat` | Stream AI response | No |
| `GET` | `/api/conversations` | Get all conversations | Yes |
| `POST` | `/api/conversations` | Create conversation | Yes |
| `GET` | `/api/conversations/[id]/messages` | Get messages | Yes |
| `POST` | `/api/conversations/[id]/messages` | Save message | Yes |
| `POST` | `/api/auth/signup` | Register new user | No |

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add all environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `GROQ_API_KEY`
4. Add your Vercel URL to Google OAuth authorized redirect URIs:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
5. Deploy! 🚀

---

## 🗺️ Roadmap

- [x] Streaming chat
- [x] Google OAuth
- [x] Email/password auth
- [x] Save conversations to DB
- [ ] Sidebar with conversation list
- [ ] Auto-generated conversation titles
- [ ] Rate limiting per user
- [ ] Usage dashboard (tokens + cost)
- [ ] Dark mode
- [ ] Voice input

---

## 📄 License

MIT — feel free to use this project however you like.

---

## 🙏 Acknowledgements

- [Vercel AI SDK](https://sdk.vercel.ai) — streaming and AI hooks
- [Groq](https://groq.com) — blazing fast LLM inference
- [NextAuth](https://authjs.dev) — authentication
- [Prisma](https://prisma.io) — database ORM
- [Neon](https://neon.tech) — serverless PostgreSQL
- [shadcn/ui](https://ui.shadcn.com) — UI components