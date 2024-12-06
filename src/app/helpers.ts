import { saveAs } from "file-saver";


export const downloadImage = (url : string) => {
    saveAs(url, "image.jpg" || "image.png");
};