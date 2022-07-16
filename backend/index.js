const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mssql = require('mssql');

const app = express();
    
app.use(cors());
app.use(bodyParser.json());

// ----> database connection
const db = ({
    user: "Interadmin",
    password: "IN^$#@~!()",
    server: "192.168.30.95",
    database: "DB_INTERNSHIP",
    port: 1433,
    options: {
    encrypt: true,
    trustServerCertificate: true,

    }
});

//  check database connection

mssql.connect(db, err => {
    if (err) { console.log('err'); }
    console.log('database connected...');
})



// get all data -----> get method

app.get('/user', (req, res) => {


    let qr = `select * from name`;

    mssql.query(qr, (err, result) => {

        if (err) {
            console.log(err, 'errs');

        }
        else (result.recordset.length > 0)
        {
            res.json
                ({
                    message: 'get all user data',
                    data: result.recordset

                });

        }
    });

});

// get single data----> get data single method

app.get('/user/:id', (req, res) => {

    // console.log('get single data');
    //  console.log(req.params.id,'getid==>')
    let gid = req.params.id;

    let qr = `select * from name where id = ${gid}`;

    mssql.query(qr, (err, result) => {

        if (err) { console.log(err); }

        else if (result.recordset.length > 0) {
            res.json({
                message: 'Get single data',
                data: result.recordset
            });
        }
        else {
            res.json({
                message: 'Data not found',
                data: result.recordset

            });
        }
    });
});

// create  data----> post method

app.post('/user', (req, res) => {
    console.log(req.body, 'Data Created.');

    let fullname = req.body.username;
    let password = req.body.Password;
    let dob = req.body.DOB;

    let qr = `insert into name(Username,password,DOB) values('${fullname}','${password}','${dob}')`;

    mssql.query(qr, (err, result) => {

        if (err) { console.log(err); }


        res.json({
            message: 'Data Created.....'

        });

    });
});


// Update single data----> put method

app.put('/user/:id', (req, res) => {

    console.log(req.body, 'update data');



    let putid = req.params.id;

    let fullname = req.body.username;
    let password = req.body.Password;
    let dob = req.body.DOB;

    let qr = `update name set Username = '${fullname}', Password = '${password}',DOB = '${dob}' where id = '${putid}'`;

    mssql.query(qr, (err, result) => {

        if (err) { console.log(err); }

        res.json({
            message: 'data updated'
        });
    });

})


// Delete single data---> delete method

app.delete('/user/:id', (req, res) => {

    let delid = req.params.id;

    let qr = `delete from name where id = '${delid}'`;

    mssql.query(qr, (err, result) => {

        if (err) { console.log(err); }

        res.json({
            message: 'data deleted'
        });

    });

})





app.listen(3000, () => {
    console.log('server is running ...');
});

