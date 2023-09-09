const { response } = require("express")
const express = require('express')
const db = require('./db_querys')
const multer = require('multer');
const cors = require('cors');



const app = express();
app.use(cors());
const port = 3001;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files');
    },
    filename: function (req, file, cb) {
      cb(null, 'attpreco.csv');
    }
});

const upload = multer({ storage })

app.post('/upload', upload.single('csvFile'), (request, response) => {
    if (!request.file) {
      response.status(400).send('O arquivo não foi upado');
      return;
    }

    // Aqui você pode realizar as operações necessárias com o arquivo CSV
    // Exemplo de leitura do arquivo:
    // const csvFilePath = req.file.path;
    // const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    // console.log(csvData);

    response.status(200).send('Arquivo upado com sucesso');
});



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

app.get('/validar-arquivo', async (request, response) => {
    try {
        // const new_price = await get_new_price();
        // console.log('new_price:', new_price);

        const validationStatus = await db.validate_new_price();
        console.log('validationStatus:', validationStatus);

        if (validationStatus >= 1) {
            response.status(200).send('Arquivo validado');
        } else {
            response.status(400).send('Falha na validação, o arquivo não cumpre as regras de 10% acima ou 10% abaixo do preço atual');
        }
    } catch (error) {
        console.log('Error:', error);
        response.status(500).send('Erro na validação');
    }
});

app.put('/update-db', async (request, response) => {
    try{
        const update_db = await db.update_price();
        console.log(update_db);

        if (update_db != null){
            response.status(200).send('Banco de dados atualizado');
        } else {
            response.status(400).send('Falha na atualização do banco de dados');
        }
    } catch (error){
        console.log('Error:', error);
        response.status(500).send('Erro na atualização');
    }
});

app.listen(port, () => {
    console.log(`Back-end listening on port ${port}`)
})