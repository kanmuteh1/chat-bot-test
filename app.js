import express from 'express';
const app = express()
const port = 3000

// EAADPC6KVsc0BAHcJvgdjJoKqZByDJZCP89EESpU1CrZCctHQOr9rsfBXLhIyoXytci5HZAwQrAtCOiwcTOemNYnwFs21mJlhsCindwYnOTT0xNx07DZBojGtVxNYqJ6Nba2mLj88XB8Eb75qVaYSWZA9c32xh9HORc2LX5ZBuIx2PXaki23ENuB

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/webhook/',(req, res) =>{
  if (req.query['hub.verify_token'] === "gbolo"){
    res.send(req.query('hub.challenge'))
  }
  res.send("wrong token")
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}`))
