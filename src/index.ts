import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const { TOKEN_BOT, CHAT_ID } = process.env;
const TELEGRAM_URL = `https://api.telegram.org/bot${TOKEN_BOT}`;

const botSendMessage = async (message: string) => {
  try {
    const chat_id = CHAT_ID;

    await axios.post(`${TELEGRAM_URL}/sendMessage`, {
      chat_id,
      parse_mode: 'Markdown',
      text: message,
    });
  } catch (error: any) {
    console.error('botSendMessage error:', error.message);
  }
};

const app = express();
app.use(express.json());

app.post('/echo', async (req, res) => {
  const data = req.body as {
    packageManager: string;
    command: string;
    buildFolder: string;
  };

  await botSendMessage(
    `packageManager = ${data.packageManager} \ncommand = ${data.command} \nbuildFolder = ${data.buildFolder}`,
  );

  res.status(200).json({ message: 'ok' });
});

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

//@ts-ignore
app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
