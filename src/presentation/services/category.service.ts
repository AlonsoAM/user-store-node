import {CreateCategoryDto, CustomError, UserEntity} from "../../domain";
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

    async getCategories() {

        try {

            const categories = await CategoryModel.find();

            const categoriesList = categories.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                    available: category.available,
                }
            });

            return{
                message: "Categories",
                categories: categoriesList,
            }

        } catch (e) {
            throw CustomError.internalServer(`${e}`);
        }

    }

}