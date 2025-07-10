import z from "zod";

export const createUserFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Nome inválido")
      .refine(
        (name) => name.trim().includes(" "),
        "Inclua pelo menos um sobrenome"
      ),
    profilePicture: z
      .any()
      .transform((fileList) =>
        fileList instanceof FileList ? fileList[0] : fileList
      )
      .refine((file) => {
        if (!file) return true; // Se for opcional e não enviado, passa
        return file.size <= 5 * 1024 * 1024; // 5 MB
      }, "O arquivo deve ter no máximo 5MB")
      .refine((file) => {
        if (!file) return true;
        return file.type.startsWith("image/");
      }, "Apenas arquivos de imagem são permitidos")
      .optional(),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type createUserFormDataSchema = z.infer<typeof createUserFormSchema>;
