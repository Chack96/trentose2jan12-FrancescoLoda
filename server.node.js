const app = require('./app.node.js');
var porta = process.env.PORT || 5000;
app.listen(porta, function () {
    console.log('Server aperto');
});
