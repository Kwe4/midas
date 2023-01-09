const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const mainRoutes = require('./routes/mainRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
require('dotenv').config()

const app = express();

const mongoPass = process.env.MONGO_PASS

mongoose.connect(`mongodb+srv://davido:${mongoPass}@cluster0.qkxt5.mongodb.net/test`).then(() => {
    console.log('DB Connected Successfully ! ')
}).catch((err) => {
    console.log(err)
});

// MiddleWare 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('.hbs', exphbs.engine({
    extname: '.hbs', defaultLayout: "main", runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.set('view engine', '.hbs');

app.use('/', mainRoutes)
app.use('/transaction', transactionRoutes)
app.get('*', (req, res) => {
    res.send('<h1>404 Page Not Found ! </h1>')
})

const PORT = process.env.PORT || 2027

app.listen(PORT)