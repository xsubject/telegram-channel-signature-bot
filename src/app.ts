import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import { config as dotenv } from 'dotenv';
import { toEscapedMessage } from './helpers';
import SignatureStorage from './SignatureStorage';
import MessageSigner from './MessageSigner';
import ChannelPostExternal from "./ChannelPostExternal";

dotenv();
const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);
const CHAT_ID = parseInt(process.env.CHAT_ID as string);
const ADMIN_ID = parseInt(process.env.ADMIN_ID as string);
const messageSigner = new MessageSigner(
    new SignatureStorage("./signature.json")
);

bot.on("text", ctx => {
    console.log("from.id =>", ctx.message.from.id);
    if(ctx.message.from.id != ADMIN_ID) {
        return ctx.reply(`Access denied, your ID: ${ctx.message.from.id}`);
    }
    messageSigner.signatureStorage.entities = ctx.message.entities || [];
    messageSigner.signatureStorage.text = ctx.message.text;
    messageSigner.signatureStorage.write();

    const signedMessage = messageSigner.sign("Example Message!\nLorem ipsum", []);
    ctx.reply(signedMessage.text, {
        disable_web_page_preview: true,
        entities: signedMessage.entities
    });
});

bot.on("channel_post", ctx => {
    if(CHAT_ID !== ctx.channelPost.chat.id) return console.log(`SKIP CHAT ${ctx.channelPost.chat.id}`);
    const external = (ctx.update.channel_post as ChannelPostExternal);
    const msg = external.text ? external.text : external.caption ? external.caption : "";
    const entities = external.entities ?  external.entities : [];
    const captionEntities = external.caption_entities ? external.caption_entities : [];
    const signedMessage = messageSigner.sign(msg, [...entities, ...captionEntities]);
    if(!external.text && !external.caption) return;
    const editMessageMethod = external.text ? "editMessageText" : "editMessageCaption";
    
    bot.telegram[editMessageMethod](
        ctx.channelPost.chat.id, 
        ctx.channelPost.message_id, 
        undefined, 
        toEscapedMessage(signedMessage.text), 
        { 
            disable_web_page_preview: true,
            entities: signedMessage.entities,
            caption_entities: signedMessage.entities
        }
    );

});

bot.on("chat_join_request", ctx => {
    if(!ctx.chatJoinRequest) return;
    if(CHAT_ID !== ctx.chatJoinRequest.chat.id) return console.log(`SKIP CHAT ${ctx.chatJoinRequest.chat.id}`);

    const from = ctx.chatJoinRequest.from;
    console.log(`Auto approve chat join: ${from.first_name} ${from.username ? `-> @${from.username}` : ""}`)
    ctx.telegram.approveChatJoinRequest(ctx.chatJoinRequest.chat.id, ctx.chatJoinRequest.from.id);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch().then(() => {
    if(!bot.botInfo) {
        console.log("Bot not authed");
    } else {
        console.log(`Bot authed: @${bot.botInfo.username}`)
    }
});