const  { Configuration, OpenAIApi } =  require('openai')
require('dotenv').config()
const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');


const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr,{small:true});
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async  msg => {
    if (msg.body == 'what?') {
        msg.reply('JAHNO supreme');
        
    }else{
        const repo = await getReponseChatGpt(msg.body)
        msg.reply(repo)
    }
  
    

});

client.initialize();


const configuration = new Configuration({
    organization: "id_org",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getReponseChatGpt(message){
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens:100
      });
      console.log("message",message)
      console.log("repo",completion.data.choices[0].text)
      return completion.data.choices[0].text;
}
//getEngins();