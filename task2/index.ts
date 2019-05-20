import addContract from './services/Contract/addContract';
import removeContract from './services/Contract/removeContract';
import getAllStocksByRenter from './services/Contract/getAllStocksByRenter';
import getAllRentersByStock from "./services/Contract/getAllRentersByStock";
import express = require("express");

const app : express = express();
const PORT: number = 8080;

app.use(express.json());

app.use('/api/*', (req, res, next) => {
    res.type('json');
    next();
});

app.get('/api/healthcheck', (req, res) => {
    res.send({
        message: 'Server is working'
    });
});

app.route('/api/rent')
    //post a new contract between a renter and a stock
    .post((req, res) => {
        const jsonResponse : string = addContract(getRequestBody(req));
        res.send(jsonResponse);
    })
    //delete a contract between a renter and a stock
    .delete((req, res) => {
        const jsonResponse : string = removeContract(getRequestBody(req));
        res.send(jsonResponse);
    })
    //get all contracts with stocks for a renter
    .get((req, res) => {
        const jsonResponse : string = getAllStocksByRenter(getRequestBody(req));
        res.send(jsonResponse);
    });

//get all contracts with renters for a stock
app.get('/api/renters', (req, res) => {
    const jsonResponse = getAllRentersByStock(getRequestBody(req));
    res.send(jsonResponse);
});

app.listen(PORT, () => console.log('Server is listening...'));

function getRequestBody(req) : object {
    return req.body;
}