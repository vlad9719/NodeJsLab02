import * as _ from 'lodash';
import { ContractService } from './contract.service';
import { validateJson } from "../validateJson";

//fields and their types for validation
const requiredFields = {
    renterId: 'number',
    stockId: 'number',
};

//function for deleting a contract by renter ID and stock ID
export default function removeContract (jsonBody: object) : string {
    const errors: object = validateJson(jsonBody, requiredFields);
    if (!_.isEmpty(errors)) {

        return JSON.stringify({
            errors
        });
    }

    const contractService : ContractService = new ContractService();

    return contractService.remove(jsonBody['renterId'], jsonBody['stockId']);
};
