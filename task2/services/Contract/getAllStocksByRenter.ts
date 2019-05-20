import * as _ from 'lodash';
import { ContractService } from './contract.service';
import { validateJson } from "../validateJson";

//needed for validation
const requiredFields = {
    renterId: 'number',
};

//function for getting all stocks by renter ID
export default function getAllStocksByRenter (jsonBody: object) : string {
    const errors: object = validateJson(jsonBody, requiredFields);
    if (!_.isEmpty(errors)) {

        return JSON.stringify({
            errors
        });
    }

    const contractService : ContractService = new ContractService();

    return contractService.getStocksByRenterId(jsonBody['renterId']);
};
