import express from 'express';
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/webhook/',(req, res) =>{
  if (req.query['hub.verify_token'] === "gbolo"){
    res.send(req.query('hub.challenge'))
  }
  res.send("wrong token")
}) 

export function start(){
    app.listen(port, () => console.log(`Example app listening on port ${port}`))
}
