<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=30&duration=3500&pause=900&color=2563EB&center=true&vCenter=true&width=720&height=80&lines=LiveDocs;Real-time+collaborative+documents;Write+together%2C+live" alt="LiveDocs" />

### 📝 A real-time collaborative document editor

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Liveblocks](https://img.shields.io/badge/Liveblocks-FF7C2B?style=for-the-badge&logo=liveblocks&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 🧭 Overview

**LiveDocs** is a real-time collaborative document editor — think Google Docs, rebuilt with a modern stack. Multiple people can edit the same document at once, see each other's live cursors, leave inline comments, and share documents with fine-grained permissions. It's built on **Liveblocks** for multiplayer state and the **Lexical** rich-text editor.

## ✨ Features

- ✍️ **Real-time co-editing** — multiple users edit the same doc simultaneously
- 👥 **Live presence** — see active collaborators and their cursors in real time
- 💬 **Inline comments** — start comment threads anywhere in a document
- 🔗 **Sharing & permissions** — invite collaborators as viewer or editor
- 🔔 **Notifications** — stay updated on mentions and changes
- 📄 **Document management** — create, rename, and delete documents
- 🌗 **Light & dark themes**
- 🔐 **Authentication** — secure sign-in with Clerk
- 🐞 **Error monitoring** — production observability via Sentry

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Collaboration | Liveblocks |
| Editor | Lexical |
| Auth | Clerk |
| Monitoring | Sentry |
| UI | Tailwind CSS, Radix UI, shadcn/ui, Lucide |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Accounts for: Clerk, Liveblocks, Sentry

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Keshavkumar04/livedocs.git
cd livedocs

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Liveblocks
LIVEBLOCKS_SECRET_KEY=""

# Sentry
SENTRY_AUTH_TOKEN=""
```

> ⚠️ **Never commit your real `.env` file.** Keep secrets out of version control and add `.env` to `.gitignore`.

## 📜 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |

## 📁 Project Structure

```
livedocs/
├── app/
│   ├── (auth)/        # Clerk sign-in / sign-up
│   ├── (root)/        # Home + document pages
│   └── api/           # Liveblocks auth endpoint
├── components/        # Editor, collaborators, modals, UI
│   └── editor/        # Lexical editor & plugins
├── lib/               # Server actions (rooms, users), Liveblocks setup
├── styles/            # Light & dark editor themes
└── types/             # Shared TypeScript types
```

<div align="center">

---

Built with 💙 by [**Keshav Kumar**](https://github.com/Keshavkumar04)

</div>
