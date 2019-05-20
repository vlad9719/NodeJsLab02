import * as _ from 'lodash';
import { ContractService } from './contract.service';
import { IContract } from './contract.interfaces';
import { validateJson } from "../validateJson";

//needed for validation
const requiredFields = {
    renterId: 'number',
    stockId: 'number',
    rentalCost: 'number'
};

//function for creating new contract out of request's JSON body
export default function addContract (jsonBody: object) : string {
    const errors: object = validateJson(jsonBody, requiredFields);
    if (!_.isEmpty(errors)) {

        return JSON.stringify({
            errors
        });
    }

    const newContract: IContract = {
        renterId: jsonBody['renterId'],
        stockId: jsonBody['stockId'],
        rentalCost: jsonBody['rentalCost'],
        createdAt: getCurrentDate()
    };

    const contractService : ContractService = new ContractService();

    return contractService.add(newContract);
};

//function to get current date as string
function getCurrentDate() : string {
    const now : Date = new Date();
    const date : number = now.getDate();
    const month : number = now.getMonth();
    const year : number = now.getFullYear();

    return `${date}-${month}-${year}`;
}
