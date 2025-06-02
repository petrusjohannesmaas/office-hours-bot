# Office Hours Bot

A Telegram-integrated time tracking bot that helps freelancers manage work
sessions efficiently through REST APIs.

## Features

### Phase 1: Wireframe

- Start, pause, continue, and complete work sessions via an **HTTP request**.
- Work sessions are logged in a **Telegram chat**.
- Testing is done via an **HTTP client** before frontend integration.

### Phase 2: MVP

- Enhance messages with contextual details for better tracking.

### Phase 3: Alpha

- Server-side fixed office hours.
- Automated notifications:
  - Before office hours start.
  - Midway through office hours.
  - At the end of office hours.
- Notifications triggered via `cron` and `curl`.

### Phase 4: Beta

- Build frontend for session visualization.
- Functionality to create reports and session notes of activities.

### Phase 5: V1

- Implement user authentication.
- Deploy the project to a VPS.

### Phase 6: V2

- Integration with **Notion API** for database functionality and improved
  logging.

## Tech Stack

- **Backend:** [Deno](https://github.com/denoland/deno)
- **HTTP Handling:** [ABC](https://github.com/zhmushan/abc)
- **Telegram Integration:** [Telegraf.js](https://github.com/telegraf/telegraf)
- **Frontend:** HTML, CSS + JavaScript
- **Automation:** Cron jobs + Curl
- **Authentication:** To be determined (JWT, OAuth)

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   deno install
   ```
3. Configure environment variables.
4. Run the server:
   ```bash
   deno run --allow-net server.ts
   ```

## Usage

- Start, pause, continue, and complete work sessions via the browser interface.
- Receive automated notifications during office hours.
- Submit reports via the frontend.
- Securely store work session logs and notes in Notion (from V2 onward).

## Future Enhancements

- Multi-user support.
- Role-based access control.
- Customizable office hours for administrators.
- Expanded integrations (Google Calendar, Slack).

---

## License

[GNU General Public License v3.0](LICENSE)