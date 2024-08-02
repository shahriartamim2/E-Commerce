import fs from "fs/promises";

const deleteImage = async (imagePath)=>{
    try {
        await fs.access(imagePath);
        await fs.unlink(imagePath);
        console.log("Image deleted successfully");
    } catch (error) {
        console.error("Image not found");
    }
}

export default deleteImage;