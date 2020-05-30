// app.js
const express = require('express')
const app = express()
const port = 3000

//logger of time-stamps, HTTP method, URL and duration time
const myLogger = function (req, res, next) {
  const DateNow = new Date()
  const start = process.hrtime() //set start time point
  //const reqTime = Date.now()
  // console.log(reqTime)

  res.on('finish', () => {
    //const resTime = Date.now()
    const duration = getDuration(start)

    //console.log(resTime, 'Duraion', (resTime - reqTime))
    console.log(`${DateNow.toLocaleString()} | ${req.method} from ${req.originalUrl} | total time: ${duration.toLocaleString()} ms`)

  })

  next();
}

//request-response cycle time function
const getDuration = function (start) {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start) //return [seconds, nanoseconds]

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

app.use(myLogger);

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send(`
  <div>新增 Todo 頁面</div>
  <form action="/" method="POST">
    <button type"submit">Creat</button>
  </form>`)
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})