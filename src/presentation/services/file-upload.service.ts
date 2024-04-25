import {UploadedFile} from "express-fileupload";
import path from "path";
import * as fs from "fs";
import {Uuid} from "../../config";
import {CustomError} from "../../domain";

export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4
    ) {
    }

    private checkFolder = (folderPath: string) => {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public uploadFile = async (file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) => {
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            if(!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Invalid file extension ${fileExtension}, valid ones are ${validExtensions.join(', ')}`);
            }

            const destination = path.resolve(__dirname, `../../../`, folder);
            this.checkFolder(destination);
            const fileName = `${this.uuid()}.${fileExtension}`;
            file.mv(`${destination}/${fileName}`);
            return {fileName};
        } catch (e) {
            // console.log({e});
            throw e;
        }

    }

    public uploadMultipleFiles = async (file: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) => {
        throw new Error("Method not implemented.");
    }

}
