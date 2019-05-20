import { ContractDal } from './DAL/contract.dal';
import { IContract, IContractService } from "./contract.interfaces";

export class ContractService implements IContractService {
    private contractDal: ContractDal;

    constructor() {
        this.contractDal = new ContractDal();
    }

    add(newContract: IContract): string {
        return this.contractDal.add(newContract);
    }

    remove(renterId: number, stockId: number): string {
        return this.contractDal.remove(renterId, stockId);
    }

    getByIds(renterId: number, stockId: number): IContract {
        return this.contractDal.getByIds(renterId, stockId);
    }

    getStocksByRenterId(renterId: number): string {
        return this.contractDal.getStocksByRenterId(renterId);
    }

    getRentersByStockId(stockId: number): string {
        return this.contractDal.getRentersByStockId(stockId);
    }
};
