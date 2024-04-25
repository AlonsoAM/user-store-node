import {MongoDB} from "../mongo/mongo-db";
import {envs} from "../../config";
import {UserModel} from "../mongo/models/user.model";
import {CategoryModel} from "../mongo/models/category.model";
import {ProductModel} from "../mongo/models/product.model";
import {seedData} from "./data";

(async () => {
    await MongoDB.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });
    await main();

    await MongoDB.disconnect();
})();

const randomBetween0andX = (x: number) => Math.floor(Math.random() * x);

async function main() {

    // 0. Borrar todo
    await Promise.all([
        UserModel.deleteMany({}),
        CategoryModel.deleteMany({}),
        ProductModel.deleteMany({})
    ])

    // 1. Crear usuarios
    const users = await UserModel.insertMany(seedData.users);

    // 2. Crear categorias
    const categories = await CategoryModel.insertMany(seedData.categories.map(category => ({
        ...category,
        user: users[randomBetween0andX(users.length)]._id
    })));

    // 3. Crear productos
    const products = await ProductModel.insertMany(seedData.products.map(product => ({
        ...product,
        category: categories[randomBetween0andX(categories.length)]._id,
        user: users[randomBetween0andX(users.length)]._id
    })));


    console.log('Seed finalizado');
}