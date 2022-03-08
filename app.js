const express = require('express');
const path = require('path');
const qrcode = require('qrcode');
let QR;

const generateQR = async text => {
    try{
        return qrcode.toDataURL(text);
    } catch(err){
        console.log(err);
    }
}

const app = express();

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static('public')); // Serve static files (e.g. CSS files)

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.get('/qr', async function(req, res){
    const QR = await generateQR('https://google.com');
    res.render('aside-QR',{image:QR});
});

app.listen(3000);

//data updated