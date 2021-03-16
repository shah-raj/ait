const WebSocket = require('ws')
const url = 'ws://localhost:4000/ws'
const connection = new WebSocket(url)
 
connection.onopen = () => {
  connection.send('Message From Client')
}
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
  
}
 
connection.onmessage = (e) => {
  console.log(e.data)
}

connection.onclose = function() {
    console.log("Connection is closed...");
    }
