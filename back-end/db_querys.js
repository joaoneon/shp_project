const db = require('./database');
const fs = require('fs');
const csv = require('csv-parser');

async function get_products() {
    const [rows] = await db.execute('SELECT * FROM shopper.products',);
    return rows;
}

function get_csv_values() {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream('./files/attpreco.csv')
            .pipe(csv({ separator: ',' }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results)) // Resolve a promise com os resultados
            .on('error', (error) => reject(error)); // Rejeita a promise se houver um erro
    });
}

async function get_produt_id() {
    return new Promise(async (resolve, reject) => {
        const data = await get_csv_values(); // Adicionado 'await' aqui
        const product_code = data[0].product_code;
        resolve(product_code);
    });
}

async function get_new_price() {
    return new Promise(async (resolve, reject) => {
        const data = await get_csv_values(); // Adicionado 'await' aqui
        const new_price = data[0].new_price;
        resolve(new_price);
    });
}

// const [value, fields] = await db.execute('SELECT * FROM shopper.products WHERE code = ?', [id]);
//  o código acima retorna [{"code":16,"name":"AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML","cost_price":"18.44","sales_price":"20.49"}]

async function get_current_price() {
    const id = await get_produt_id();
    const [value, fields] = await db.execute('SELECT sales_price FROM shopper.products WHERE code = ?', [id]);
    return value[0].sales_price;
}

async function get_cost_price() {
    const id = await get_produt_id();
    const [value, fields] = await db.execute('SELECT cost_price FROM shopper.products WHERE code = ?', [id]);
    return value[0].cost_price;
}

async function check_if_pack() {
    const id = await get_produt_id();
    const [value, fields] = await db.execute('SELECT * FROM shopper.packs WHERE code = ?', [id]);

}

async function validate_new_price() {
    const id = await get_produt_id();
    const current_price = parseFloat(await get_current_price());
    const new_price = parseFloat(await get_new_price());

    console.log('current_price:', current_price);
    console.log('new_price:', new_price);

    const priceDifference = (new_price - current_price) / current_price;

    console.log('priceDifference:', priceDifference);


    if (priceDifference > 0.1) {
        resultado = "Não é possível alterar o valor, o valor é 10% maior que o valor antigo"
        return 0;
    }
    else if (priceDifference < -0.1) {
        resultado = "Não é possível alterar o valor, o valor é 10% menor que o valor antigo"
        return 0;
    }
    else if (priceDifference === 0) {
        resultado = "O valor é o mesmo, não há necessidade de alterar o valor"
        return 0;
    }
    else {
        resultado = "O valor será alterado"
        return 1;
    }
}

async function update_price() {
    const id = await get_produt_id();
    const new_price = await get_new_price();

    const [value, fields] = await db.execute('UPDATE products SET sales_price  = ? WHERE code = ?', [new_price, id]);
    return value;

}


module.exports = {
    get_products,
    get_csv_values,
    get_produt_id,
    get_new_price,
    get_current_price,
    get_cost_price,
    validate_new_price,
    update_price
};
