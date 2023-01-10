const db = require('../../config/mysql2/db');
const productSchema = require('../../model/joi/Product');

exports.getProducts = () => {
    return db.promise().query(`SELECT * FROM Produkt`)
        .then((results, fields) => {
           // console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getProductById = (id_produkt) => {
    const query1 =
        `SELECT P.id_produkt as id_produkt, P.Nazwa, P.Typ_produktu, P.Pojemnosc, P.Cena, P.Opis,
            Pc.id_producent as id_producent, Pc.Nazwa_firmy, Pc.Panstwo, Pc.Miasto, Pc.Telefon, Pc.Email,
            Z.id as id, Z.Ilosc, Z.Data_dostawy, Z.Komentarz
    FROM Produkt P 
    join Zamowienie Z on P.id_produkt = Z.id_produkt
    join Producent Pc on Pc.id_producent = Z.id_producent
    where P.id_produkt = ?`

    const query2 =
        `SELECT P.id_produkt as id_produkt, P.Nazwa, P.Typ_produktu, P.Pojemnosc, P.Cena, P.Opis
    FROM Produkt P 
    where P.id_produkt = ?`

    return db.promise().query(query1, [id_produkt])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return db.promise().query(query2, [id_produkt])
                    .then((results, fields) => {
                        const secondRow = results[0][0];
                        if (!secondRow) {
                            return {};
                        }
                        const product = {
                            id_produkt: parseInt(id_produkt),
                            Nazwa: secondRow.Nazwa,
                            Typ_produktu: secondRow.Typ_produktu,
                            Pojemnosc: secondRow.Pojemnosc,
                            Cena: secondRow.Cena,
                            Opis: secondRow.Opis,
                            orders: []
                        }
                        return product;
                    });
            }

            const product = {
                id_produkt : parseInt(id_produkt),
                Nazwa: firstRow.Nazwa,
                Typ_produktu: firstRow.Typ_produktu,
                Pojemnosc: firstRow.Pojemnosc,
                Cena: firstRow.Cena,
                Opis: firstRow.Opis,
                orders: []
            }

            for(let i=0; i<results[0].length; i++){
                const row = results[0][i];
                if(row.id){
                    const order = {
                        id: row.id,
                        Ilosc : row.Ilosc,
                        Data_dostawy: row.Data_dostawy,
                        Komentarz : row.Komentarz,
                        producer : {
                            id_producent: row.id_producent,
                            Nazwa_firmy: row.Nazwa_firmy,
                            Panstwo: row.Panstwo,
                            Miasto: row.Miasto,
                            Telefon: row.Telefon,
                            Email: row.Email
                        }
                    };
                    product.orders.push(order);
                }
            }
            return product;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.createProduct = (newProductData) => {
    console.log("createProduct");
    const vRes = productSchema.validate(newProductData, {abortEarly:false});
    if(vRes.error){
        console.log('error create product')
        return Promise.reject(vRes.error);
    } else {
        const Nazwa = newProductData.Nazwa;
        const Typ_produktu = newProductData.Typ_produktu;
        const Pojemnosc = newProductData.Pojemnosc;
        const Cena = newProductData.Cena;
        const Opis = newProductData.Opis;

        const sql = `INSERT into Produkt(Nazwa, Typ_produktu, Pojemnosc, Cena, Opis) VALUES (?,?,?,?,?)`
        return db.promise().execute(sql, [Nazwa, Typ_produktu, Pojemnosc, Cena, Opis]);
    }
};

exports.updateProduct = (id_produkt, productData) => {
    console.log("updateProduct");
    const vRes = productSchema.validate(productData, {abortEarly:false});
    if(vRes.error){
        console.log('error update product')
        return Promise.reject(vRes.error);
    } else {
        const Nazwa = productData.Nazwa;
        const Typ_produktu = productData.Typ_produktu;
        const Pojemnosc = productData.Pojemnosc;
        const Cena = productData.Cena;
        const Opis = productData.Opis;

        const sql = `UPDATE Produkt set Nazwa=?, Typ_produktu=?, Pojemnosc = ?, Cena = ?, Opis=? WHERE id_produkt=?`;
        return db.promise().execute(sql,[Nazwa, Typ_produktu,Pojemnosc,Cena,Opis, id_produkt]);
    }
};

exports.deleteProduct = (productId) => {
    console.log("deleteProduct");
    const sql1 = `DELETE FROM Zamowienie where id_produkt = ?`
    const sql2 = `DELETE FROM Produkt where id_produkt = ?`

    return db.promise().execute(sql1, [productId])
        .then( () => {
            return db.promise().execute(sql2, [productId])
        });
};

