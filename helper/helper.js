import fetch from 'node-fetch';

// Handles messages events
export const handleMessage = (sender_psid, received_message) => {
    let response;
  
    // Checks if the message contains text
    if (received_message.text) {
      
      // Creates the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        "text": `You sent the message: "${received_message.text}".`
      }
  
    } else if (received_message.attachments) {
    
      // Gets the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
    
    } 
    
    // Sends the response message
    callSendAPI(sender_psid, response); 
}
  
// Handles messaging_postbacks events
export const handlePostback = (sender_psid, received_postback) => {
    let response;
    
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}
  
  // Sends response messages via the Send API
export const callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
    
    fetch('https://graph.facebook.com/v2.6/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_body)
    })
    .then(res => {
      if (res.ok) {
        console.log('message sent!');
        return res.json();
      } else {
        console.error('Unable to send message:', res.statusText);
      }
    })
    .catch(error => {
      console.error('Unable to send message:', error);
    });
}