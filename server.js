const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const https = require('https');
const fs = require('fs');
const config = {
    views: 'views',
    static: 'static',
};
var app = express();
var routes = require('./routes/index');




var cookieParser = require('cookie-parser'); // module for parsing cookies



app.use(bodyparser.urlencoded({
    extended: false
}));

var expressWs = require('ws');
wss = new expressWs.Server({ port: 4000 }) 
app.use(bodyparser.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');
app.use('/',routes);
app.use(express.static('static/images'));
app.use(express.static('static/css'));
app.use(express.static('static/vendor'));
app.use(express.static('static/fonts'));
app.use(express.static('static/js'));

app.listen(5000, () => {
    console.log('Express server started at port : 5000');
});

wss.on('connection', ws => {
    ws.on('message', msg => {
        ws.send(msg)
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
})


app.get('*', (req, res) => {
    res.render('message',{title:"404 Error",message:'404! This URL does not exist'});
});
