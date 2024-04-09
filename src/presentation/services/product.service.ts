import {CreateProductDto, CustomError, PaginationDto} from "../../domain";
import {ProductModel} from "../../data";

export class ProductService {
    constructor() {
    }

    public getProducts = async (paginationDto: PaginationDto) => {
        const {page, limit} = paginationDto;

        try {

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate("user")
                    .populate("category")
            ])

            return{
                message: "Products",
                page,
                limit,
                total,
                next: `api/products?page=${page + 1}&limit=${limit}`,
                previous: page > 1 ? `api/products?page=${page - 1}&limit=${limit}` : null,
                products
            }

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }
    };

    public createProduct = async (createProductDto: CreateProductDto) => {

        const productExists = await ProductModel.findOne({name: createProductDto.name})
        if (productExists) return {message: "Product already exists"};

        try {

            const product = new ProductModel({
                ...createProductDto,
            });

            await product.save();

            return {
                message: "Product created",
                product
            }

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }
    };

}