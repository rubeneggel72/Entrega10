var express = require('express')
var app = express();
var router = express.Router();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '../../views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '../../views/partials/'
}));

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use('/api', require('../rutas/api'))

app.use('/', router)



app.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});

// JSON productos para agregar
//{"title":"iPhone 11 64 GB (Product)Red","price":159000,"thumbnail":"a001.jpg"}
//{"title":"iPhone 12 64 GB azul","price":200000,"thumbnail":"a002.jpg"}
//{"title":"iPhone XR 64 GB negro","price":139000,"thumbnail":"a003.jpg"}
//{"title":"iPhone XR 64 GB negro","price":139000,"thumbnail":"a003.jpg"}
