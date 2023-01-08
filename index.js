const TelegramBot = require('node-telegram-bot-api');

const token = '5823953700:AAEfiI7UHgKrJgzZm5fCaNatgZTRa5NHX7k'
const webAppUrl = "https://rococo-tartufo-f41502.netlify.app"

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text
    if (text === '/start'){
        await bot.sendMessage(chatId, 'Нажмите на кнопку заполинть форму',{
            reply_markup: {
                keyboard: [
                    [{text: "Заполнить форму"}]
                ]
            }
        });
    }

    if (text === '/go'){
        await bot.sendMessage(chatId, 'Нажмите на кнопку заполнить форму2',{
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Поделится ботом', web_app: {url: webAppUrl}}]
                ]
            })});
    }

});