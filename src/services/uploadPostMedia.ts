import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const sanitizeEmail = (email: string) => {
  return email.replace(/[@.]/g, "_");
};

export const uploadPostMedia = async (file: File, userEmail: string) => {
  try {
    const safeEmail = sanitizeEmail(userEmail);
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const newFileName = `${timestamp}.${extension}`;

    const fileRef = ref(storage, `post_media/${safeEmail}/${newFileName}`);

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    return url;
  } catch (error) {
    console.error("Erro ao subir imagem:", error);
    throw error;
  }
};
