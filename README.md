# Office Hours Bot

## Features

**MVP**  
✅ Start, pause, complete work sessions for individual team members via Telegram.
✅ Concurrent usage and tracking
✅ Recieve basic feedback for every command

**Alpha**
🏗️ Docker compose deployment
- Set custom office hours
- Email features

**Beta**
- Integration with **Notion API** for database functionality and improved logging.

## Tech Stack

- **Backend:** [Deno](https://github.com/denoland/deno)
- **Telegram Integration:** [grammY](https://grammy.dev/)
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
   deno run --allow-all server.ts
   ```

## Usage

- Run `/start`, `/continue`, `/complete` to manage a session
- On complete, you need to respond with the tasks you were working on
- Share the generated work log with colleagues or keep it for your documentation (Maybe with Git?)
- Access the `work_log.txt` in the project 

## Future Enhancements

- Role-based access control.
- Customizable office hours for administrators.
- Expanded integrations (Google Calendar, Slack).

---

## License

[GNU General Public License v3.0](LICENSE)
