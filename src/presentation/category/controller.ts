import {Response, Request} from "express";
import {CustomError} from "../../domain";

export class CategoryController{
    constructor() {
    }
    private handledError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    };
    public getCategories = async (req: Request, res: Response) => {
        try {
            res.json({ message: "Categories" });
        } catch (error) {
            this.handledError(error, res);
        }
    };
    public createCategory = async (req: Request, res: Response) => {
        try {
            res.json({ message: "Category created" });
        } catch (error) {
            this.handledError(error, res);
        }
    };
}