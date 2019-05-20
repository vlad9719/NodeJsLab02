# NodeJsLab02

This repo contains 2 packages: ```task1``` and ```task2```. 
Both of them implement similar task,
which is to provide an API for managing contracts between Renter and Stock entities. 
The folder ```task1```
contains implementation using Node.JS HTTP modules and TypeScript.
The folder ```task2``` contains implementation using Express framework and TypeScript.

### Installing

Step 1. Clone the repo 
```
git clone https://github.com/vlad9719/NodeJsLab02

cd NodeJsLab02
```

Step 2. Go to one of the ```taskX``` folders

```
cd task1
//or
cd task2
```

Step 3. Install dependencies
```
npm install
```

Step 4. Run the server

```
ts-node index.ts
```

## API in action

Use Postman for checking API's work

Step 1. Check whether server is working using ```healthcheck``` endpoint with ```GET``` request.

The endpoint's URL is as follows:

```
localhost:8080/api/healthcheck
```

The expected response is as follows:
```
{
    "message": "Server is working"
}
```

Step 2. Add a new contract using ```rent``` endpoing with ```POST``` request.

The endpoint's URL is as follows:

```
POST localhost:8080/api/rent
```

You should provide JSON body for this request with three required parameters: ```stockId```,
 ```renterId``` and ```rentalCost```.

Please note that records for the project are stored in ```records``` folder.
You can find a valid ```renterId``` in records of ```records/renters.txt``` file,
 and a valid ```stockId``` in records ```records/stocks.txt``` file. 
 
 But there's no need for you to lookup those IDs, you may just use following valid values
  in your request.
The valid ```renterId```s are numbers ```1```, ```2```, ```3``` and ```4``` .
The valid ```stockId```s are numbers ```1```, ```2``` and ```3```.

API expects you to send it JSON body like this:

```
{
	"stockId": 3,
	"renterId": 3,
	"rentalCost": 8930
}
```

The expected response is as follows:
```
{
    {
        "addedContract": {
            "renterId": 3,
            "stockId": 3,
            "rentalCost": 8930,
            "createdAt": "20-4-2019"
        }
    }
}
```

You may want to add a couple of contracts so that 
to have contracts to delete and view afterwards.

Step 3. Delete a contract you've just created with ```DELETE``` HTTP method.

The endpoint's URL is as follows:

```
DELETE localhost:8080/api/rent
```
API expects you to send JSON body like this:

```
{
	"stockId": 3,
	"renterId": 3
}
```

The expected response is as follows:
```
{
    "removedContract": {
        "renterId": 3,
        "stockId": 3,
        "rentalCost": 8930,
        "createdAt": "20-4-2019"
    }
}
```

Step 4. View all stocks rented by a particular renter with ```GET``` method.

The endpoint's URL is as follows:

```
GET localhost:8080/api/rent
```
API expects you to send JSON body like this. 
Remember that valid ```renterId```s 
are numbers ```1```, ```2```, ```3``` and ```4``` :

```
{
	"renterId": 3
}
```


The expected response is as follows:
```
{
    "contracts": [
        {
            "createdAt": "20-4-2019",
            "name": "Stock 3",
            "rentalCost": 8930
        },
        {
            "createdAt": "20-4-2019",
            "name": "Stock 2",
            "rentalCost": 8930
        }
    ],
    "total": 17860
}
```

Step 5. View all renters by stock using ```renters``` endpoint
and ```GET``` method

The endpoint's URL is as follows:

```
GET localhost:8080/api/renters
```
API expects you to send JSON body like this. 
Remember that valid ```stockId```s 
are numbers ```1```, ```2``` and```3```:

```
{
	"stockId": 3
}
```


The expected response is as follows:
```
{
    "contracts": [
        {
            "createdAt": "20-4-2019",
            "renterName": "Bob",
            "rentalCost": 8930
        },
        {
            "createdAt": "20-4-2019",
            "renterName": "Jack",
            "rentalCost": 8930
        }
    ]
}
```