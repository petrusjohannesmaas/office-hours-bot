# Office Hours Bot

A Telegram-integrated time tracking bot that improves accountability and transparency for remote teams.

## Features

**MVP**  
- Start, pause, complete work sessions for individual team members via Telegram.
- Recieve response messages for each command.
- Calculate total time spent working for each user.

**Alpha**
- Set custom office hours notifications 
- Report feature for individual team members
- Email features

**Beta**
- Integration with **Notion API** for database functionality and improved logging.

## Tech Stack

- **Backend:** [Deno](https://github.com/denoland/deno)
- **Telegram Integration:** [grammY](https://grammy.dev/)
- **HTTP Handling:** [ABC](https://github.com/zhmushan/abc)
- **Automation:** Cron jobs + Curl

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/petrusjohannesmaas/office-hours-bot.git
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

- Start, pause, continue, and complete work sessions via the chat interface.
- Submit reports via the chat interface.
- Securely store work session logs and notes in Notion (from Beta onward).

## Future Enhancements

- Role-based access control.
- Customizable office hours for administrators.
- Expanded integrations (Google Calendar, Slack).

---

## License

[GNU General Public License v3.0](LICENSE)
