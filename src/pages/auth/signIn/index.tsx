import { Button } from "../../../components/button";
import { Link } from "react-router-dom";
import { Input } from "../components/input";

export const SignIn = () => {
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
          <Input id="email" placeholder="Digite o seu e-mail" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            Senha
          </label>
          <Input id="email" type="password" placeholder="Digite a sua senha" />
          <Link to="/" className="underline text-xs text-end text-dark-blue">
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
      <Button variant="primary" size="full">
        Entrar
      </Button>
      <Link to="/auth/signup" className="text-xs text-center text-dark-blue">
        Ainda não tem uma conta? <span className="underline">Crie aqui</span>
      </Link>
    </div>
  );
};
