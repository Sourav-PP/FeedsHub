import { v2 as cloudinary } from "cloudinary";
import { config } from "../../shared/config.constant";
import { IFileStorage } from "../../domain/services/file-storage.interface";
import path from "path";

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

export class CloudinaryStorage implements IFileStorage {
    async upload(fileBuffer: Buffer, filename: string, folder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const baseFilename = path.parse(filename).name;
            const fullFolderPath = `${config.cloudinary.root}/${folder}`;
            cloudinary.uploader
                .upload_stream(
                    { folder: fullFolderPath, public_id: baseFilename, resource_type: "auto" },
                    (error, result) => {
                        if (error) return reject(error);
                        if (!result || !result.secure_url)
                            return reject(new Error("Upload failed: no result returned from Cloudinary"));
                        resolve(result.secure_url);
                    },
                )
                .end(fileBuffer);
        });
    }
}
