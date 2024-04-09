import {PaginationDto} from "../../domain";

export class ProductService {
    constructor() {
    }

    public getProducts = async (paginationDto: PaginationDto) => {
        const {page, limit} = paginationDto;
        // Implementar
        return {message: "Products", page, limit};
    };

    public createProduct = async () => {
        // Implementar
        return {message: "Product created"};
    };

}