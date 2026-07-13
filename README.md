<div align="center">
  <img src="https://img.icons8.com/color/96/000000/code.png" alt="Logo" width="80" height="80">
  <h1 align="center">LeetWrite AI</h1>
  <p align="center">
    A production-ready AI SaaS tool designed to automatically generate high-quality, professional LeetCode discussion posts from accepted solutions.
    <br />
    <br />
    <a href="#features">Features</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#architecture">Architecture</a>
  </p>
</div>

---

## 🚀 Overview

**LeetWrite AI** acts as a senior software engineer by your side. It takes your accepted LeetCode solution and magically transforms it into a clean, markdown-formatted discussion post. It automatically breaks down your algorithm, identifies time and space complexities, extracts key takeaways, and crafts a clear "Intuition" and "Approach" section. 

This project is built to production-ready SaaS standards, featuring a sleek, dark-themed UI with Next.js, and a highly modular, decoupled Spring Boot backend. 

## ✨ Features

- **Instant Generation:** Paste your code and receive a meticulously crafted LeetCode discussion post in seconds.
- **AI-Powered:** Driven by the ultra-fast OpenRouter `deepseek/deepseek-chat` model.
- **Robust Validation:** Frontend strict schema validation via Zod ensures only clean requests reach the server.
- **Resilient Backend:** Modular AI Service integration featuring graceful exception handling and strict JSON parsing.
- **Sleek UI/UX:** Built with a curated dark-mode design system utilizing Tailwind CSS v4, Inter, and JetBrains Mono typography.
- **Stateless Architecture:** No databases, no auth—just lightning-fast, stateless API passthrough.

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Validation:** Zod
- **Typography:** Inter (Sans), JetBrains Mono (Code)

### Backend
- **Framework:** Spring Boot 3
- **Language:** Java 21+
- **AI Integration:** OpenRouter Chat Completions API
- **JSON Parsing:** Jackson Databind

---

## ⚙️ Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Java 21](https://adoptium.net/) (or higher)
- [Maven](https://maven.apache.org/) (or use the provided wrapper)
- An active [OpenRouter API Key](https://openrouter.ai/)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/leetwrite-ai.git
cd leetwrite-ai
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file from the example template:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and add your OpenRouter API Key:
   ```env
   OPENROUTER_API_KEY=your_actual_api_key_here
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   OPENROUTER_MODEL=deepseek/deepseek-chat
   SERVER_PORT=8081
   ```
4. Run the Spring Boot server (ensure the `.env` variables are loaded in your terminal context):
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start listening on `http://localhost:8081`.*

### 3. Frontend Setup

1. Open a new terminal tab and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will start running on `http://localhost:3000`.*

---

## 🏗 Architecture & Design Philosophy

The project adheres to strict Separation of Concerns (SoC) principles:
- **Frontend (`/frontend`):** Exclusively handles UI state, user interactions, Zod-based data validation, and markdown rendering. It delegates all heavy lifting to the backend.
- **Backend (`/backend`):** Acts as a secure, stateless proxy layer. It safely houses the external API keys, formats the system/user prompts, orchestrates communication with the AI provider (OpenRouter), and standardizes errors.

**Modular AI Strategy:**  
The AI integration is abstracted behind the `AIService` interface. Switching from OpenRouter to OpenAI, Anthropic, or Gemini simply requires injecting a new `AIService` implementation—no core logic changes required.

---

## 📜 API Reference

### Generate Discussion Post
`POST /api/v1/generate`

**Request Body**
```json
{
  "problemUrl": "https://leetcode.com/problems/two-sum",
  "language": "JAVA",
  "code": "class Solution { public int[] twoSum... }"
}
```

**Successful Response (200 OK)**
```json
{
  "title": "...",
  "intuition": "...",
  "approach": "...",
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "formattedCode": "...",
  "keyTakeaways": ["...", "..."]
}
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  <i>Crafted with precision for LeetCoders by Software Engineers.</i>
</p>
