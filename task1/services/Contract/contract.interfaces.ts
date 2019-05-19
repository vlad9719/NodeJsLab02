export interface IContract {
    renterId: number,
    stockId: number,
    rentalCost: number,
    createdAt: string
}

export interface IContractService {
    getByIds(renterId: number, stockId: number) : IContract
    add(newContract : IContract) : string,
    remove(renterId: number, stockId: number) : string,
    getStocksByRenterId(renterId: number) : string,
    getRentersByStockId(stockId: number) : string
}

export interface IContractDal {
    getByIds(renterId: number, stockId: number) : IContract | null
    add(newContract : IContract) : string
    remove(renterId: number, stockId: number) : string,
    getStocksByRenterId(renterId: number) : string,
    getRentersByStockId(stockId: number) : string
}
