<div align="center">
  <img src="https://img.icons8.com/color/96/000000/code.png" alt="Logo" width="80" height="80">
  <h1 align="center">LeetWrite AI</h1>
  
  <p align="center">
    <strong>A production-ready AI tool that automatically generates high-quality, professional LeetCode discussion posts from your accepted solutions.</strong>
  </p>
  
  <p align="center">
    <a href="https://github.com/mxoizzz/LeetWrite-AI/stargazers"><img src="https://img.shields.io/github/stars/mxoizzz/LeetWrite-AI?style=for-the-badge&color=eab308" alt="Stars Badge"/></a>
    <a href="https://github.com/mxoizzz/LeetWrite-AI/network/members"><img src="https://img.shields.io/github/forks/mxoizzz/LeetWrite-AI?style=for-the-badge&color=3b82f6" alt="Forks Badge"/></a>
    <a href="https://github.com/mxoizzz/LeetWrite-AI/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge&color=10b981" alt="PRs Welcome"/></a>
    <a href="https://github.com/mxoizzz/LeetWrite-AI/blob/main/LICENSE"><img src="https://img.shields.io/github/license/mxoizzz/LeetWrite-AI?style=for-the-badge&color=8b5cf6" alt="License"/></a>
  </p>

  <p align="center">
    <a href="#features">Features</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#architecture">Architecture</a>
    ·
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 🚀 Overview

**LeetWrite AI** acts as a senior software engineer by your side. It takes your accepted LeetCode solution and magically transforms it into a clean, markdown-formatted discussion post. It automatically breaks down your algorithm, identifies time and space complexities, extracts key takeaways, and crafts a clear "Intuition" and "Approach" section. 

This project is built to production-ready SaaS standards, featuring a highly-polished brutalist dark-themed UI built with Next.js, and a highly modular, decoupled Spring Boot backend. 

## ✨ Features

- **Instant Generation:** Paste your code and receive a meticulously crafted LeetCode discussion post in seconds.
- **AI-Powered:** Driven by the ultra-fast OpenRouter `deepseek/deepseek-chat` model.
- **Robust Validation:** Frontend strict schema validation via Zod ensures only clean requests reach the server.
- **Resilient Backend:** Modular AI Service integration featuring graceful exponential backoff and strict JSON parsing.
- **Sleek Brutalist UI:** Built with a highly-polished, typography-heavy brutalist aesthetic utilizing GSAP for animations, Tailwind CSS, Bebas Neue, and IBM Plex Mono typography.
- **Dedicated Docs:** Comprehensive built-in documentation page to ensure you get the perfect output every time.
- **Stateless Architecture:** No databases, no auth—just lightning-fast, stateless API passthrough.

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Validation:** Zod

### Backend
- **Framework:** [Spring Boot 3](https://spring.io/projects/spring-boot)
- **Language:** Java 21+
- **AI Integration:** [OpenRouter Chat Completions API](https://openrouter.ai/)
- **JSON Parsing:** Jackson Databind

---

## ⚙️ Getting Started

Want to run LeetWrite AI locally or contribute? Follow these steps!

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Java 21](https://adoptium.net/) (or higher)
- An active [OpenRouter API Key](https://openrouter.ai/)

### 1. Clone the repository
```bash
git clone https://github.com/mxoizzz/LeetWrite-AI.git
cd LeetWrite-AI
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
- **Frontend (`/frontend`):** Exclusively handles UI state, user interactions, Zod-based data validation, and markdown rendering. It delegates all heavy computational and API work to the backend.
- **Backend (`/backend`):** Acts as a secure, stateless proxy layer. It safely houses the external API keys, formats the system/user prompts, orchestrates communication with the AI provider, and standardizes errors.

**Modular AI Strategy:**  
The AI integration is abstracted behind the `AIService` interface. Switching from OpenRouter to OpenAI, Anthropic, or Gemini simply requires injecting a new `AIService` implementation—no core logic changes required.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

If you find a bug or have a feature request, please [open an issue](https://github.com/mxoizzz/LeetWrite-AI/issues).

---

## 👨‍💻 Author

**Moiz Shaikh (@mxoizzz)**
* [GitHub](https://github.com/mxoizzz)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  <br/>
  <i>Crafted with precision for LeetCoders by Software Engineers.</i>
</p>
