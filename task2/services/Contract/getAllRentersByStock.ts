import * as _ from 'lodash';
import { ContractService } from './contract.service';
import { validateJson } from "../validateJson";

//needed for validation
const requiredFields = {
    stockId: 'number',
};

//function for getting all renters by stock ID
export default function getAllRentersByStock (jsonBody: object) : string {
    const errors: object = validateJson(jsonBody, requiredFields);
    if (!_.isEmpty(errors)) {

        return JSON.stringify({
            errors
        });
    }

    const contractService : ContractService = new ContractService();

    return contractService.getRentersByStockId(jsonBody['stockId']);
};
