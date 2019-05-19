import {IContract, IContractDal} from "../contract.interfaces";
import * as fs from "fs";

export class ContractDal implements IContractDal {
    private contracts : IContract[];

    public getStocksByRenterId(renterId: number): string {
        this.readAllContractsFromFile();

        if (!this.renterExists(renterId)) {
            return JSON.stringify({
                message: 'No renter with such id'
            })
        }

        const contracts : IContract[] = this.contracts.filter(contract => contract.renterId === renterId);
        const stockIds: number[] = contracts.map(contract => contract.stockId);

        const fileContent: string = fs.readFileSync('./records/stocks.txt', 'utf-8');
        const stocksArray: object[] = JSON.parse(fileContent);
        let stocks : object[] = [];

        for (let stockId of stockIds) {
            const stock : object = stocksArray.find(stock => stock['id'] === stockId);
            stocks.push(stock);
        }

        let total : number = 0;
        contracts.forEach( contract => {
            total += contract.rentalCost;
        });

        return JSON.stringify({
            contracts: contracts.map(contract => {
                return {
                    createdAt: contract.createdAt,
                    name: stocks.find(stock => stock['id'] === contract.stockId)['name'],
                    rentalCost: contract.rentalCost,
                }
            }),
            total
        })
    }

    public getRentersByStockId(stockId: number): string {
        this.readAllContractsFromFile();

        if (!this.stockExists(stockId)) {
            return JSON.stringify({
                message: 'No stock with such id'
            });
        }

        const contracts : IContract[] = this.contracts.filter(contract => contract.stockId === stockId);
        const rentersIds: number[] = contracts.map(contract => contract.renterId);

        const fileContent: string = fs.readFileSync('./records/renters.txt', 'utf-8');
        const rentersArray: object[] = JSON.parse(fileContent);
        let renters : object[] = [];

        for (let renterId of rentersIds) {
            const renter : object = rentersArray.find(renter => renter['id'] === renterId);
            renters.push(renter);
        }

        return JSON.stringify({
            contracts: contracts.map(contract => {
                return {
                    createdAt: contract.createdAt,
                    renterName: renters.find(renter => renter['id'] === contract.renterId)['name'],
                    rentalCost: contract.rentalCost,
                }
            })
        });
    }

    public getByIds(renterId: number, stockId: number): IContract | null {
        this.readAllContractsFromFile();
        return this.contracts.find( (contract: IContract) => contract.renterId === renterId && contract.stockId === stockId);
    }

    public add(newContract: IContract): string {
        this.readAllContractsFromFile();
        if (!this.renterExists(newContract.renterId)) {
            return JSON.stringify({
                message: 'No renter with such id'
            })
        }

        if (!this.stockExists(newContract.stockId)) {
            return JSON.stringify({
                message: 'No stock with such id'
            })
        }

        if (!this.stockHasExtraSpace(newContract.stockId)) {
            return JSON.stringify({
                message: 'This stock has no available cells'
            });
        }

        if (this.contractExists(newContract.renterId, newContract.stockId)) {
            return JSON.stringify({
                message: 'Contract with such renterId and stockId already exists'
            });
        }

        this.contracts.push(newContract);
        this.writeAllContractsToFile();
        return JSON.stringify({
            addedContract: newContract
        });
    }

    public remove(renterId: number, stockId: number) : string {
        if (!this.contractExists(renterId, stockId)) {
            return JSON.stringify({
                message: 'No such contract'
            });
        }

        const removedContract : IContract = this.getByIds(renterId, stockId);
        this.contracts = this.contracts.filter(contract => contract !== removedContract);
        this.writeAllContractsToFile();
        return JSON.stringify({
            removedContract
        });
    }

    private stockHasExtraSpace(stockId : number) : boolean {
        const fileContent: string = fs.readFileSync('./records/stocks.txt', 'utf-8');
        const stocksArray: object[] = JSON.parse(fileContent);

        const stock : object = stocksArray.find( stock => stock['id'] === stockId);
        const cells : number = stock['numberOfCells'];
        return this.countStockContracts(stockId) < cells;
    }

    private countStockContracts(stockId: number) : number {
        this.readAllContractsFromFile();
        const stockContracts = this.contracts.filter( contract => contract['stockId'] === stockId);
        return stockContracts.length;
    }

    private contractExists(renterId: number, stockId: number) {
        this.readAllContractsFromFile();
        return this.contracts.some( contract => contract['stockId'] === stockId && contract['renterId'] === renterId);
    }

    private renterExists(renterId: number) : boolean {
        const fileContent: string = fs.readFileSync('./records/renters.txt', 'utf-8');
        const rentersArray : object[] = JSON.parse(fileContent);

        return rentersArray.some(renter => renter['id'] === renterId);
    }

    private stockExists(stockId: number) : boolean {
        const fileContent: string = fs.readFileSync('./records/stocks.txt', 'utf-8');
        const stocksArray : object[] = JSON.parse(fileContent);

        return stocksArray.some(stock => stock['id'] === stockId);
    }

    private readAllContractsFromFile() : void {
        const fileContent: string = fs.readFileSync('./records/contracts.txt', 'utf-8');
        this.contracts = JSON.parse(fileContent);
    }

    private writeAllContractsToFile() : void {
        fs.writeFileSync('records/contracts.txt', JSON.stringify(this.contracts));
    }
}
