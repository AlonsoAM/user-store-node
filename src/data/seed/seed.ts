import {MongoDB} from "../mongo/mongo-db";
import {envs} from "../../config";

(async () => {
    await MongoDB.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });
    await main();

    await MongoDB.disconnect();
})();

async function main(){
    // 1. Crear usuarios

    // 2. Crear categorias

    // 3. Crear productos

    console.log('Seed finalizado');
}