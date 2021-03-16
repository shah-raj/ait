
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 4000 }) 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })

  ws.on('end', () => {
    console.log('Connection ended...');
    });

  ws.send('Hello! Message From Server!!')
})
