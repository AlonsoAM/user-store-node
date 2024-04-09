import {Response, Request} from "express";
import {CustomError, PaginationDto} from "../../domain";
import {ProductService} from "../services/product.service";

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {
    }

    private handledError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({error: "Internal Server Error"});
    };

    public getProducts = async (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        try {
            // Implementar
            this.productService.getProducts(paginationDto!)
                .then(products => res.status(200).json(products))
                .catch(error => this.handledError(error, res));
        } catch (error) {
            this.handledError(error, res);
        }
    };

    public createProduct = async (req: Request, res: Response) => {
        try {
            // Implementar
            this.productService.createProduct()
                .then(product => res.status(201).json(product))
                .catch(error => this.handledError(error, res));
        } catch (error) {
            this.handledError(error, res);
        }
    };
}