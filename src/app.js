
const express = require('express');
const crypto = require("crypto");

const id = crypto.randomBytes(16).toString("hex");
const app = express();
const port = process.env.PORT || 3000;

const urlencodedParser = express.urlencoded({extended: false});

let base = [];

app.use(express.json({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/body', urlencodedParser,  (req, res) => {
  res.send(req.body)
})

app.post('/base', urlencodedParser,  (req, res) => {
  const newEntity = {...req.body, _id: crypto.randomBytes(16).toString("hex")};

  base.push(newEntity);

  res.send(newEntity);
})

app.get('/base', (req, res) => {
  res.send(base)
})

app.delete('/base', urlencodedParser, (req, res) => {
  let resData = null;

  base = base.filter(item => {
    if(item._id === req.body.id) {
      resData = item;
      return false;
    }

    return true;
  });

  res.send(resData)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})