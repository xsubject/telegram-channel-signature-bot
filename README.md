# Telegram Channel Signature Bot
This bot will create the caption you specify in the channel posts


Clone the repository then use install deps.
```bash
cd telegram-channel-signature-bot
yarn
```

Edit `.env` file to configure
```bash
cp .env.example .env
nano .env
```

```bash
BOT_TOKEN={TOKEN BOT HERE}
CHAT_ID={CHANNEL ID HERE}
ADMIN_ID={YOUR ACCOUNT ID HERE}
```

* To create bot, contact [@BotFather](https://telegram.me/BotFather)
* Run bot with `BOT_TOKEN`

```bash
yarn build
yarn start
```
* To find chat id, add the bot to the required channel and you will see a message in the console when the post is released:
```bash
SKIP CHAT -999999999 # <- CHAT_ID Here
```
* To find admin id, write any message to bot and you will see a reply:
```bash
Access denied, your ID: 99999999 # <- ADMIN_ID Here
```

* Send the bot a message with the content in the form of the desired caption to the posts

Now your bot will add your signature to all posts in the channel