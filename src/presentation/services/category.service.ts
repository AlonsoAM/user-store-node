import {CreateCategoryDto, CustomError, PaginationDto, UserEntity} from "../../domain";
import {CategoryModel} from "../../data";

export class CategoryService {

    constructor() {
    }

    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
        const categoryExists = await CategoryModel.findOne({name: createCategoryDto.name});
        if (categoryExists) throw CustomError.badRequest("Category already exists");

        try {

            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            });
            await category.save();
            return {
                message: "Category created",
                category: {
                    id: category.id,
                    name: category.name,
                    available: category.available,
                }
            };

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }
    }

    async getCategories(paginationDto: PaginationDto) {

        const {page, limit} = paginationDto;

        try {

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ]);

            return {
                message: "Categories",
                page,
                limit,
                total,
                next: `api/categories?page=${page + 1}&limit=${limit}`,
                previous: page > 1 ? `api/categories?page=${page - 1}&limit=${limit}` : null,
                categories: categories.map((category) => (
                    {
                        id: category.id,
                        name: category.name,
                        available: category.available,
                    }
                ))
            }

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }

    }

}