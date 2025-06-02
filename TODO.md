# To do list

### **Phase 1: Wireframe **

#### 1️⃣ **Setup & Environment**
- ✓ Initialize a Deno project.
- ✓  Install necessary dependencies (`abc` for HTTP handling, `telegraf` for Telegram integration, dotenv for environment variables).
- 🚧 Set up environment variables for Telegram bot credentials.

#### 2️⃣ **Define API Endpoints**
- [ ] Create HTTP routes for:
  - **Start session:** `POST /session/start`
  - **Pause session:** `POST /session/pause`
  - **Continue session:** `POST /session/continue`
  - **Complete session:** `POST /session/complete`
- [ ] Implement basic request handling using **ABC package**.

#### 3️⃣ **Integrate Telegram Logging**
- [ ] Set up a Telegram bot using **Telegraf for Deno**.
- [ ] Implement logic to send messages upon receiving each API request.
  - Log timestamps and relevant session details in a Telegram chat.

#### 4️⃣ **Testing via HTTP Client**
- [ ] Choose an HTTP client (e.g., **Postman**, `curl`, or **httpie**) for testing.
- [ ] Validate API request functionality (correct responses, proper Telegram logging).
- [ ] Ensure session flow is correctly triggered via API calls.

#### 5️⃣ **Refinement & Debugging**
- [ ] Handle errors gracefully (invalid requests, bot authentication failures).
- [ ] Log API responses for better debugging.
- [ ] Test concurrency handling (e.g., preventing multiple active sessions).

---

This should give you a solid **roadmap** for Phase 1. Want to add any extra considerations before diving in? 🚀