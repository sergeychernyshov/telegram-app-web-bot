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
                    [{text: "Заполнить форму", web_app: {url: webAppUrl + '/form'}}]
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

    if(msg?.web_app_data?.data){
        try{
            const data = JSON.parse(msg?.web_app_data?.data)

            await bot.sendMessage(chatId, 'Спасибо!')
            await bot.sendMessage(chatId,'Страна: '+data?.country)
            await bot.sendMessage(chatId,'Улица: '+data?.street)

             setTimeout(async () => {
                 await bot.sendMessage(chatId,'Мы рада, что Вы пользуетесь нашим ботом')
             },1500)
        }catch (e){
            console.log(e)
        }

    }
});