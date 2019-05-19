import * as http from 'http';
import addContract from './services/Contract/addContract';
import removeContract from './services/Contract/removeContract';
import getAllStocksByRenter from './services/Contract/getAllStocksByRenter';
import getAllRentersByStock from "./services/Contract/getAllRentersByStock";

const PORT: string = '8080';

const METHODS = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
};

const server = http.createServer((request, response) => {
    const method: string = request.method;
    const url: string = request.url;

    response.setHeader('Content-Type', 'application/json');

    let jsonResponse: string;
    let jsonBody: object;

    //retrieving request's body
    let body: Uint8Array[] = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const bodyString: string = Buffer.concat(body).toString();


        switch (url) {
            case '/api/healthcheck':
                if (method === METHODS.GET) {
                    jsonResponse = JSON.stringify({
                        'message': 'Server is running'
                    });
                    response.end(jsonResponse);
                }
                break;
            case '/api/rent': {
                if (!bodyString) {
                    jsonResponse =  JSON.stringify({
                        'error': 'Please provide JSON body for request'
                    });
                    response.end(jsonResponse);
                    break;
                }
                jsonBody = JSON.parse(bodyString);

                if (method === METHODS.POST) {
                    jsonResponse = addContract(jsonBody);
                    response.end(jsonResponse);
                    break;
                }

                if (method === METHODS.DELETE) {
                    jsonResponse = removeContract(jsonBody);
                    response.end(jsonResponse);
                    break;
                }

                if (method === METHODS.GET) {
                    jsonResponse = getAllStocksByRenter(jsonBody);
                    response.end(jsonResponse);
                    break;
                }

                break;
            }

            case '/api/renters': {
                if (!bodyString) {
                    jsonResponse =  JSON.stringify({
                        'error': 'Please provide JSON body for request'
                    });
                    response.end(jsonResponse);
                    break;
                }
                jsonBody = JSON.parse(bodyString);

                if (method === METHODS.GET) {
                    jsonResponse = getAllRentersByStock(jsonBody);
                    response.end(jsonResponse);
                    break;
                }

                break;
            }

            default: {
                jsonResponse = JSON.stringify({
                    'message': 'No such endpoint'
                });
                response.end(jsonResponse);

                break;
            }
        }
    });
});

server.listen(PORT, () => console.log('Server is listening...'));
