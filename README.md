<div align="center">
  <h1 align="center">LEETWRITE AI</h1>
  
  <p align="center">
    <strong>A production-grade AI engine that automatically generates high-quality, professional LeetCode discussion posts from accepted solutions.</strong>
  </p>
  
  <p align="center">
    <a href="https://github.com/mxoizzz/LeetWrite-AI/stargazers"><img src="https://img.shields.io/github/stars/mxoizzz/LeetWrite-AI?style=for-the-badge&color=000000" alt="Stars Badge"/></a>
    <a href="https://github.com/mxoizzz/LeetWrite-AI/network/members"><img src="https://img.shields.io/github/forks/mxoizzz/LeetWrite-AI?style=for-the-badge&color=000000" alt="Forks Badge"/></a>
    <a href="https://github.com/mxoizzz/LeetWrite-AI/pulls"><img src="https://img.shields.io/badge/PRs-welcome-000000.svg?style=for-the-badge" alt="PRs Welcome"/></a>
    <a href="https://github.com/mxoizzz/LeetWrite-AI/blob/main/LICENSE"><img src="https://img.shields.io/github/license/mxoizzz/LeetWrite-AI?style=for-the-badge&color=000000" alt="License"/></a>
  </p>

  <p align="center">
    <a href="#overview">Overview</a>
    ·
    <a href="#architecture--design-philosophy">Architecture</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

<details>
  <summary><b>[ INTERACTIVE: SYSTEM DIAGNOSTICS ]</b></summary>
  <br/>
  
  Welcome to the LeetWrite diagnostic shell.
  
  <details>
    <summary><b>> run analyze_workflow.sh</b></summary>
    <br/>
    
    Analyzing algorithmic complexity...<br/>
    Validating temporal constraints...<br/>
    Optimization patterns detected.<br/><br/>
    
    <details>
      <summary><b>> run generate_documentation.sh</b></summary>
      <br/>
      
      Success. Output generated in 0.42s.<br/>
      Proceed to <b>Getting Started</b> to deploy your instance.
      
    </details>
  </details>
</details>

---

## OVERVIEW

LeetWrite AI functions as an automated senior engineering proxy. It intercepts raw, accepted algorithm solutions and orchestrates a highly-structured, markdown-formatted technical write-up. The system automatically performs static analysis to deduce time and space complexities, extracts core takeaways, and crafts professional Intuition and Approach documentation.

This project is built to production-ready SaaS standards, featuring a strict brutalist UI constructed with Next.js and a modular, decoupled Spring Boot backend.

## CORE CAPABILITIES

- **Instant Generation:** Transforms raw code into meticulously crafted technical documentation with sub-second latency.
- **Dynamic Theming Engine:** Built-in Light/Dark mode with a customizable 5-color accent system utilizing dynamic CSS variables.
- **Markdown Synchronization:** Features a seamless, dual-pane architecture where raw Markdown edits instantly reflect in the visual rendering.
- **Robust Validation:** Frontend strict schema validation via Zod ensures only sanitized payloads reach the backend infrastructure.
- **Resilient Backend:** Modular AI Service integration featuring graceful exponential backoff and strict JSON parsing logic.
- **Stateless Architecture:** Operates with zero persistent database dependencies; a pure, lightning-fast stateless API proxy.

## TECH STACK

**Frontend Infrastructure**
- Framework: Next.js (App Router)
- Styling Engine: Tailwind CSS v4
- Language: TypeScript
- Validation: Zod

**Backend Infrastructure**
- Framework: Spring Boot 3
- Runtime: Java 21+
- Containerization: Docker (Multi-stage build)
- AI Integration: OpenRouter API Proxy

---

## GETTING STARTED

The following instructions detail the local development setup for both the frontend and backend services.

### Prerequisites
- Node.js (v18 or higher)
- Java 21 (or higher)
- Active OpenRouter API Key

### Repository Initialization
```bash
git clone https://github.com/mxoizzz/LeetWrite-AI.git
cd LeetWrite-AI
```

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create the environment configuration:
   ```bash
   cp .env.example .env
   ```
3. Populate `.env` with the required credentials:
   ```env
   OPENROUTER_API_KEY=your_actual_api_key_here
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   OPENROUTER_MODEL=deepseek/deepseek-chat
   SERVER_PORT=8081
   ```
4. Initialize the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will initialize and bind to `http://localhost:8081`.*

### Frontend Configuration

1. Open a secondary terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will compile and bind to `http://localhost:3000`.*

---

## DEPLOYMENT

This repository is pre-configured for immediate deployment to modern cloud infrastructure.

**Backend (Render)**
The backend includes a highly-optimized, multi-stage `Dockerfile` and dynamic port binding logic. Import the repository into Render as a Docker Web Service, specify the root directory as `backend`, and provide the `OPENROUTER_API_KEY` environment variable.

**Frontend (Vercel)**
The frontend is built for Vercel. Import the repository, set the Root Directory to `frontend`, ensure the Framework Preset is set to Next.js, and inject the backend URL via the `NEXT_PUBLIC_API_URL` environment variable.

---

## ARCHITECTURE & DESIGN PHILOSOPHY

The project strictly adheres to Separation of Concerns (SoC) principles:
- **Frontend (`/frontend`):** Exclusively handles UI state, client-side validation, theme management, and dynamic markdown rendering.
- **Backend (`/backend`):** Functions as a secure, stateless proxy layer. It sanitizes prompts, orchestrates communication with the LLM provider, and standardizes payload structures.

**Modular AI Strategy**
The core AI integration is abstracted behind a primary `AIService` interface. Migrating execution from OpenRouter to alternatives such as OpenAI, Anthropic, or Gemini requires solely injecting a new interface implementation, leaving the core application logic untouched.

---

## AUTHOR

**Moiz Shaikh (@mxoizzz)**
* GitHub: [github.com/mxoizzz](https://github.com/mxoizzz)
* LinkedIn: [in/moizshaikh007](https://www.linkedin.com/in/moizshaikh007/)

## LICENSE

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  <br/>
  <i>Crafted with precision for competitive engineers.</i>
</p>
