const db = require('../../config/mysql2/db');
const producerSchema = require("../../model/joi/Producent");

exports.getProducers = () => {
    return db.promise().query(`SELECT * FROM Producent`)
        .then((results, fields) => {
           // console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getProducerById = (id_producent) => {
    const query =
        `SELECT  Pc.id_producent as id_producent, Pc.Nazwa_firmy, Pc.Panstwo, Pc.Miasto, Pc.Telefon, Pc.Email,
        P.id_produkt as id_produkt, P.Nazwa, P.Typ_produktu, P.Pojemnosc, P.Cena, P.Opis,
        Z.id as id, Z.Ilosc, Z.Data_dostawy, Z.Komentarz
    FROM Produkt P 
    join Zamowienie Z on P.id_produkt = Z.id_produkt
    join Producent Pc on Pc.id_producent = Z.id_producent
    where Pc.id_producent = ?`

    const query2 =
        `SELECT  Pc.id_producent as id_producent, Pc.Nazwa_firmy, Pc.Panstwo, Pc.Miasto, Pc.Telefon, Pc.Email
    FROM Producent Pc
    where Pc.id_producent = ?`

    return db.promise().query(query, [id_producent])
        .then((results, fields) => {
            const firstRow = results[0][0];
          //console.log(firstRow)
            if(!firstRow){
                return db.promise().query(query2, [id_producent])
                    .then((results, fields) => {
                        const secondRow = results[0][0];
                        if(!secondRow){
                            return {};
                        }
                        const producer = {
                            id_producent : parseInt(id_producent),
                            Nazwa_firmy: secondRow.Nazwa_firmy,
                            Panstwo: secondRow.Panstwo,
                            Miasto: secondRow.Miasto,
                            Telefon: secondRow.Telefon,
                            Email: secondRow.Email,
                            orders: []
                        }
                        return producer;
                    });

            }
            const producer = {
                id_producent : parseInt(id_producent),
                Nazwa_firmy: firstRow.Nazwa_firmy,
                Panstwo: firstRow.Panstwo,
                Miasto: firstRow.Miasto,
                Telefon: firstRow.Telefon,
                Email: firstRow.Email,
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
                        product : {
                            id_produkt: row.id_produkt,
                            Nazwa: row.Nazwa,
                            Typ_produktu: row.Typ_produktu,
                            Pojemnosc: row.Pojemnosc,
                            Cena: row.Cena,
                            Opis: row.Opis
                        }
                    };
                    producer.orders.push(order);
                }
            }
            return producer;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.createProducer = (newProducerData) => {
    const vRes = producerSchema.validate(newProducerData, {abortEarly:false});
    if(vRes.error){
        console.log('error create producer')
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(newProducerData.Email)
        .then(emailErr => {
            if(emailErr){
                console.log("emailErr");
                return Promise.reject(emailErr);
            }
            else {
                const Nazwa_firmy = newProducerData.Nazwa_firmy;
                const Panstwo = newProducerData.Panstwo;
                const Miasto = newProducerData.Miasto;
                const Telefon = newProducerData.Telefon;
                const Email = newProducerData.Email;

                const sql = `INSERT into Producent (Nazwa_firmy, Panstwo, Miasto, Telefon, Email) VALUES (?,?,?,?,?)`
                console.log("createProducer");
                console.log(newProducerData);
                return db.promise().execute(sql, [Nazwa_firmy, Panstwo,Miasto,Telefon,Email]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })
};

exports.updateProducer = (id_producent, producerData) => {
    console.log("updateProducer");
    const vRes = producerSchema.validate(producerData, {abortEarly:false});
    if(vRes.error){
        console.log('error update producer')
        return Promise.reject(vRes.error);
    } return checkEmailUnique(producerData.Email)
        .then(emailErr => {
            if(emailErr){
                console.log("emailErr");
                return Promise.reject(emailErr);
            } else {
                const Nazwa_firmy = producerData.Nazwa_firmy;
                const Panstwo = producerData.Panstwo;
                const Miasto = producerData.Miasto;
                const Telefon = producerData.Telefon;
                const Email = producerData.Email;
                // console.log(id_producent);

                const sql = 'UPDATE Producent set Nazwa_firmy=?, Panstwo=?, Miasto = ?, Telefon = ?, Email=? WHERE id_producent=?'
                return db.promise().execute(sql, [Nazwa_firmy, Panstwo, Miasto, Telefon, Email, id_producent])
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })
};

exports.deleteProducer = (producerId) => {
    console.log("deleteProducer")
    const sql1 = `DELETE FROM Zamowienie where id_producent = ?`
    const sql2 = `DELETE FROM Producent where id_producent = ?`

    return db.promise().execute(sql1, [producerId])
        .then(() => {
            return db.promise().execute(sql2, [producerId])
        });
};


checkEmailUnique = (Email, id_producent) => {
    let sql, promise;
    if(id_producent){
        sql = `select COUNT(1) as count_email from Producent where id_producent!=? and Email=?`;
        promise = db.promise().query(sql, [id_producent, Email]);
    }else {
        sql = `select COUNT(1) as count_email from Producent where Email = ?`;
        promise = db.promise().query(sql, [Email]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].count_email;
        let err = {};
        if(count > 0){
            console.log(count);
            err = {
                details: [{
                    path: ['Email'],
                    message: 'Podany email jest juz uzywany'
                }]
            };
            return err;
        }
    });
}