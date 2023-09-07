const { response } = require("express")
const express = require('express')
const db = require('./db_querys')


const app = express()
const port = 3001

//product_code,new_price
//16,25.50
// usar connection.end() para finalizar a conexao com o bd


app.get('/teste', (request, response) => {
    response.send('Hello Worl2d!')
})

app.get('/produtos', async (request, response) => {
    const products = await db.get_products();
    response.json(products);
});

app.get('/csv', async (request, response) => {
    try {
        const product_id = await db.get_produt_id();
        const new_price = await db.get_new_price();
        // console.log(`product_id : ${product_id}`);
        // console.log(`new_price : ${new_price}`);
        response.send(`product_id : ${product_id} <br> new_price : ${new_price}` )
    } catch (error) {
        console.error('Erro ao ler o arquivo CSV:', error);
    }
});

app.get('/price', async (request, response) => {
    try {
        const product_id = await db.get_produtId();
        const price = await db.get_current_price();
        response.send(`product_id : ${product_id} <br> current_price : ${JSON.stringify(price)}` )
    } catch (error) {
        console.error('Erro ao ler o arquivo CSV:', error);
    }
});


app.listen(port, () => {
    console.log(`Back-end listening on port ${port}`)
})