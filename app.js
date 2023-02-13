import express from 'express';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express()
const port = process.env.PORT || 5000
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
app.use(express.json());

//routers
import { home } from './router/webRouter.js'
import { convo,connect } from './router/chatbotRouter.js';
app.use(home);
app.use(convo)
app.use(connect)

// // Handles messages events
// function handleMessage(sender_psid, received_message) {
//   let response;

//   // Checks if the message contains text
//   if (received_message.text) {
    
//     // Creates the payload for a basic text message, which
//     // will be added to the body of our request to the Send API
//     response = {
//       "text": `You sent the message: "${received_message.text}".`
//     }

//   } else if (received_message.attachments) {
  
//     // Gets the URL of the message attachment
//     let attachment_url = received_message.attachments[0].payload.url;
  
//   } 
  
//   // Sends the response message
//   callSendAPI(sender_psid, response); 
// }

// // Handles messaging_postbacks events
// function handlePostback(sender_psid, received_postback) {
//     let response;
  
//   // Get the payload for the postback
//   let payload = received_postback.payload;

//   // Set the response based on the postback payload
//   if (payload === 'yes') {
//     response = { "text": "Thanks!" }
//   } else if (payload === 'no') {
//     response = { "text": "Oops, try sending another image." }
//   }
//   // Send the message to acknowledge the postback
//   callSendAPI(sender_psid, response);
// }

// // Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {
//   // Construct the message body
//   let request_body = {
//     "recipient": {
//       "id": sender_psid
//     },
//     "message": response
//   }
  
//   fetch('https://graph.facebook.com/v2.6/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(request_body)
//   })
//   .then(res => {
//     if (res.ok) {
//       console.log('message sent!');
//       return res.json();
//     } else {
//       console.error('Unable to send message:', res.statusText);
//     }
//   })
//   .catch(error => {
//     console.error('Unable to send message:', error);
//   });
// }

// app.post('/webhook', (req, res) => {  

//   // Parse the request body from the POST
//   let body = req.body;

//   // Check the webhook event is from a Page subscription
//   if (body.object === 'page') {

//     // Iterate over each entry - there may be multiple if batched
//     body.entry.forEach(function(entry) {
      
//       // Gets the body of the webhook event
//       let webhook_event = entry.messaging[0];
//       console.log(webhook_event);


//       // Get the sender PSID
//       let sender_psid = webhook_event.sender.id;
//       console.log('Sender PSID: ' + sender_psid);

//       // Check if the event is a message or postback and
//       // pass the event to the appropriate handler function
//       if (webhook_event.message) {
//         handleMessage(sender_psid, webhook_event.message);        
//       } else if (webhook_event.postback) {
//         handlePostback(sender_psid, webhook_event.postback);
//       }
      
//     });

//     // Return a '200 OK' response to all events
//     res.status(200).send('EVENT_RECEIVED');

//   } else {
//     // Return a '404 Not Found' if event is not from a page subscription
//     res.sendStatus(404);
//   }

// });

// app.get('/webhook', (req, res) => {  
//   // Parse params from the webhook verification request
//   let mode = req.query['hub.mode'];
//   let token = req.query['hub.verify_token'];
//   let challenge = req.query['hub.challenge'];
    
//   // Check if a token and mode were sent
//   if (mode && token) {
  
//     // Check the mode and token sent are correct
//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
//       // Respond with 200 OK and challenge token from the request
//       console.log('WEBHOOK_VERIFIED');
//       res.status(200).send(challenge);
    
//     } else {
//       // Responds with '403 Forbidden' if verify tokens do not match
//       res.sendStatus(403);      
//     }
//   }
// });

app.listen(port, () => console.log(`Example app listening on port ${port}`));