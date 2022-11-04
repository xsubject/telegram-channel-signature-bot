# Get Started

## Clone repository
```sh
git clone git@github.com:xsubject/telegram-channel-signature-bot.git
```

## Create Bot Token
Open telegram and find BotFather and create a new bot using hints, after copy your telegram bot key

<img width="296" alt="image" src="https://user-images.githubusercontent.com/63466627/199969276-b95531d2-9f24-4d26-b436-23797290fbe4.png">
<img width="541" alt="image" src="https://user-images.githubusercontent.com/63466627/199969590-f890d238-cbbd-472c-aa34-50cd23c83b91.png">

## Put your token to your env
### If using local folder
Creates `.env` file based on `.env.example`
```bash
cp .env.example .env
```
```
BOT_TOKEN=5708152915:AAE92GLKORIRcU4qZyrOP9HCQt4Jx43lN7o
CHAT_ID=
ADMIN_ID=
```
### If using docker compose
Creates `docker-compose.yml` file based on `docker-compose-example.yml`
```yml
// ...
  app:
    // ...
    environment:
      - BOT_TOKEN=5622128701:AAHWDbgaJE2cV74wmBEvf56_fhPQKBaKlTs
      - ADMIN_ID=
      - CHAT_ID=-
    // ...
```

## Build and start bot

### if using local folder
```bash
npm install
npm run start
```

### if using docker compose
```bash
docker-compose up
```

Now if you send any message to the bot, it will show your ID to put in `ADMIN_ID`
<img width="519" alt="image" src="https://user-images.githubusercontent.com/63466627/199971594-a0657c1d-a302-44f1-95c9-871441ae28c6.png">

Also add your bot to your channel with permission: `edit messages`, `invite users`, and and when you send a message to the channel, you will see the channel ID in the terminal log
<img width="409" alt="image" src="https://user-images.githubusercontent.com/63466627/199972094-91c6f305-de19-4b41-8e31-5748e9c67ba9.png">

update your environment variables and reload your app

### if using docker compose
Now you can add `-d` flag to run bot as deamon
```bash
docker-compose up -d
```

Now you just have to write a message to your bot, which will contain the desired signature

![signature (5)](https://user-images.githubusercontent.com/63466627/199975082-b5c47ad6-0023-4870-8d18-489fa0459487.gif)

