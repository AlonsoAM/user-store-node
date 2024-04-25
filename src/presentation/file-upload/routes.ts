import {Router} from "express";
import {AuthMiddleware} from "../middlewares/auth.middleware";
import {FileUploadController} from "./controller";
import {FileUploadService} from "../services/file-upload.service";

export class FileUploadtRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new FileUploadController(new FileUploadService());

        // Definir las rutas
        // api/upload/single/<user|category|product>/
        // api/upload/multiple/<user|category|product>/
        router.post("/single/:type", controller.uploadFile );
        router.post("/multiple/:type", controller.uploadMultipleFiles );

        return router;
    }
}
