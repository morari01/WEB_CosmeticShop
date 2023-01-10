const db = require('../../config/mysql2/db');
const orderSchema = require("../../model/joi/Order");

exports.getOrders = () => {
    const query = `SELECT Z.Id as id, Z.Data_dostawy, Z.Ilosc, Z.Komentarz,
       P.id_produkt as id_produkt, P.Nazwa, P.Typ_produktu, P.Pojemnosc, P.Cena, P.Opis,
       PP.id_producent as id_producent, PP.Nazwa_firmy, PP.Panstwo, PP.Miasto, PP.Telefon, PP.Email
    FROM Zamowienie Z
    LEFT JOIN Produkt P on Z.id_produkt = P.id_produkt
    LEFT JOIN Producent PP on Z.id_producent = PP.id_producent`;
    return db.promise().query(query)
        .then((results, fields) => {

            let orders = [];
            for(let i = 0; i< results[0].length; i++){
                const row = results[0][i];
                const order = {
                    id : row.id,
                    Ilosc: row.Ilosc,
                    Data_dostawy: row.Data_dostawy,
                    Komentarz: row.Komentarz,
                    product: {
                        id_produkt : row.id_produkt,
                        Nazwa: row.Nazwa,
                        Typ_produktu: row.Typ_produktu,
                        Cena: row.Cena,
                        Pojemnosc: row.Pojemnosc,
                        Opis: row.Opis
                    },
                    producer: {
                        id_producent: row.id_producent,
                        Nazwa_firmy: row.Nazwa_firmy,
                        Panstwo: row.Panstwo,
                        Miasto: row.Miasto,
                        Telefon: row.Telefon,
                        Email: row.Email
                    }
                };
                orders.push(order);
            }
           // console.log(orders);
            return orders;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getOrderById = (OrderId) => {
    const query = `SELECT Z.Id as id, Z.Data_dostawy, Z.Ilosc, Z.Komentarz,
       P.id_produkt as id_produkt, P.Nazwa, P.Typ_produktu, P.Pojemnosc, P.Cena, P.Opis,
       PP.id_producent as id_producent, PP.Nazwa_firmy, PP.Panstwo, PP.Miasto, PP.Telefon, PP.Email
    FROM Zamowienie Z
    LEFT JOIN Produkt P on Z.id_produkt = P.id_produkt
    LEFT JOIN Producent PP on Z.id_producent = PP.id_producent
    WHERE Z.id = ?`

    return db.promise().query(query, [OrderId])
        .then((results, fields) => {
            const row = results[0][0];
            if(!row){
                return {};
            }
            const order = {
                id : row.id,
                id_produkt: row.id_produkt,
                id_producent: row.id_producent,
                Ilosc: row.Ilosc,
                Data_dostawy: row.Data_dostawy,
                Komentarz: row.Komentarz,
                product: {
                    id_produkt : row.id_produkt,
                    Nazwa: row.Nazwa,
                    Typ_produktu: row.Typ_produktu,
                    Cena: row.Cena,
                    Pojemnosc: row.Pojemnosc,
                    Opis: row.Opis
                },
                producer: {
                    id_producent: row.id_producent,
                    Nazwa_firmy: row.Nazwa_firmy,
                    Panstwo: row.Panstwo,
                    Miasto: row.Miasto,
                    Telefon: row.Telefon,
                    Email: row.Email
                }
            };
          //  console.log("order by id",order);
            return order;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.createOrder = (newOrderData) => {
    const vRes = orderSchema.validate(newOrderData, {abortEarly:false});
    if(vRes.error){
        console.log('error create order')
        return Promise.reject(vRes.error);
    }else{
        const sql = `INSERT into Zamowienie (id_produkt, id_producent, Data_dostawy, Ilosc, Komentarz) VALUES (?,?,?,?,?)`
        return db.promise().execute(sql, [newOrderData.id_produkt, newOrderData.id_producent, newOrderData.Data_dostawy, newOrderData.Ilosc, newOrderData.Komentarz]);
    }
};

exports.updateOrder = (id, orderData) => {
    console.log('updateOrder');
    const vRes = orderSchema.validate(orderData, {abortEarly:false});
    if(vRes.error){
        console.log('error update order')
        return Promise.reject(vRes.error);
    }
    else{
        const sql = `UPDATE Zamowienie set id_produkt=?, id_producent=?, Data_dostawy=?, Ilosc=?, Komentarz=? where id=?`;
        return db.promise().execute(sql,[orderData.id_produkt, orderData.id_producent, orderData.Data_dostawy, orderData.Ilosc, orderData.Komentarz, id]);
    }
};

exports.deleteOrder = (OrderId) => {
    console.log('deleteOrder');
    console.log(OrderId)
    const sql1 = `DELETE FROM Zamowienie where id = ?`
    return db.promise().execute(sql1, [OrderId]);
};

exports.deleteManyOrders = (ordersId) => {
    const sql = `DELETE FROM Zamowienie where id IN (?)`
    return db.promise().execute(sql, [ordersId]);
}

