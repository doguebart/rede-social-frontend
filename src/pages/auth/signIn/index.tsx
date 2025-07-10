import { Button } from "../../../components/button";
import { Link } from "react-router-dom";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "../../../hooks/useAuth";

const signinFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type signinFormDataSchema = z.infer<typeof signinFormSchema>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signinFormDataSchema>({
    resolver: zodResolver(signinFormSchema),
    mode: "onChange",
  });

  const isFormValid = isValid;

  const { login, isLoading } = useAuth();

  const onSubmit = async (data: signinFormDataSchema) => {
    const email = data.email.trim();
    const password = data.password.trim();

    await login({ email, password });
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-h-full flex flex-col gap-[2rem]">
      <h1 className="w-full text-start text-dark-blue font-medium text-2xl">
        Fazer login
      </h1>
      <form className="w-full max-h-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            E-mail
          </label>
          <div className="w-full flex flex-col gap-2">
            <Input
              id="email"
              placeholder="Digite o seu e-mail"
              {...register("email")}
              className={`${errors.email && "border-red-500"}`}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Senha
          </label>
          <div className="w-full flex flex-col gap-2">
            <Input
              id="password"
              type="password"
              placeholder="Digite a sua senha"
              {...register("password")}
              className={`${errors.password && "border-red-500"}`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <Link to="/" className="underline text-xs text-end text-dark-blue">
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
      <Button
        variant={`${isFormValid ? "primary" : "disabled"}`}
        size="full"
        disabled={!isFormValid}
        onClick={handleSubmit(onSubmit)}
      >
        Entrar
      </Button>
      <Link to="/auth/signup" className="text-xs text-center text-dark-blue">
        Ainda não tem uma conta? <span className="underline">Crie aqui</span>
      </Link>
    </div>
  );
};
