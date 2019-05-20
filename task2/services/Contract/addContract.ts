import * as _ from 'lodash';
import { ContractService } from './contract.service';
import { IContract } from './contract.interfaces';
import { validateJson } from "../validateJson";
import getCurrentDate from '../getCurrentDate';

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
