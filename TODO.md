# To do list

### **Phase 1: Wireframe**

#### 1️⃣ **Setup & Environment**

- ✅ Route project files
  - ✓ Initialize a Deno project.
  - ✓ Install necessary dependencies (`abc` for HTTP handling, `telegraf` for
    Telegram integration, dotenv for environment variables).
  - ✓ Create a `public` directory for static assets.
  - ✓ Set up enviroment variables routing

#### 2️⃣ **Define API Endpoints**

- ✅ Create HTTP routes for:
  - ✓ **Start session:** `POST /session/start`
  - ✓ **Pause session:** `POST /session/pause`
  - ✓ **Continue session:** `POST /session/continue`
  - ✓ **Complete session:** `POST /session/complete`
- ✅ Implement basic request handling using **ABC package**.

#### 3️⃣ **Integrate Telegram Logging**

- 🚧 Telegram bot setup
  - Research Telegram bot requirements.
  - Set up **Telegraf for Deno** with Hello World test.
  - Implement logic to send messages upon receiving each API request.

#### 4️⃣ **Testing via HTTP Client**

- [ ] Choose an HTTP client (e.g., **Postman**, `curl`, or **httpie**) for
      testing.
- [ ] Validate API request functionality (correct responses, proper Telegram
      logging).
- [ ] Ensure session flow is correctly triggered via API calls.

#### 5️⃣ **Refinement & Debugging**

- [ ] Handle errors gracefully (invalid requests, bot authentication failures).
- [ ] Log API responses for better debugging.
- [ ] Test concurrency handling (e.g., preventing multiple active sessions).

---