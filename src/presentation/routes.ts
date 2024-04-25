import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import {CategoryRoutes} from "./category/routes";
import {ProductRoutes} from "./poduct/routes";
import {FileUploadtRoutes} from "./file-upload/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/upload", FileUploadtRoutes.routes);

    return router;
  }
}
