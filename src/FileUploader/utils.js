import {
  faFilePdf as pdfIcon,
  faImage as imageIcon,
  faFileArchive as fileArchive
} from '@fortawesome/free-solid-svg-icons';

export const getFileTypeName = (type) => {
  switch(type) {
    case "image/png":
    case "image/jpg":
      return "Imagen";
    case "application/pdf":
      return "PDF";
    default:
      return "Archivo";
  }
}

export const getFileIcon = (type) => {
  switch(type) {
    case "image/png":
      return imageIcon;
    case "application/pdf":
      return pdfIcon;
    default:
      return fileArchive;
  }
}

export const isImageType = (type) => type.includes("image");
