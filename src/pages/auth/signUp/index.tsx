import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { Input } from "../components/input";
import { MoveLeft, MoveRight, Image } from "lucide-react";
import { useState } from "react";
import { ProfilePreview } from "./components/profile-preview";
import { ProgressBar } from "./components/progress-bar";

export const SignUp = () => {
  const [step, setStep] = useState(1);

  const handleStepIncrease = () => {
    setStep(step < 3 ? step + 1 : step);
  };

  const handleStepdDecrease = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-h-full flex flex-col gap-[2rem]">
      <h1 className="w-full text-start text-dark-blue font-medium text-2xl">
        Criar conta
      </h1>
      <form className="w-full max-h-full flex flex-col gap-6">
        <ProgressBar step={step} />

        {step === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm">
                Nome completo
              </label>
              <Input id="name" placeholder="Digite o seu nome completo" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                E-mail
              </label>
              <Input id="email" placeholder="Digite o seu e-mail" />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Nova senha
              </label>
              <Input
                id="email"
                type="password"
                placeholder="Digite a sua senha"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Confirmar senha
              </label>
              <Input
                id="email"
                type="password"
                placeholder="Confirme a sua senha"
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="w-full max-h-full flex flex-col gap-6">
              <ProfilePreview />
              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="text-sm">
                  Escolher foto de perfil
                </label>
                <Input id="file" type="file" className="hidden" />
                <label
                  htmlFor="file"
                  className="w-full flex items-center justify-center gap-2 px-4 h-[3rem] rounded border border-dark-blue/50 text-dark-blue/50 cursor-pointer"
                >
                  Selecionar foto de perfil
                  <Image size={18} />
                </label>
              </div>
            </div>
          </>
        )}
      </form>
      <div className="flex items-center gap-2">
        {step > 1 && (
          <Button
            variant="outline"
            size="fit"
            className="flex items-center justify-center gap-2"
            onClick={handleStepdDecrease}
          >
            <MoveLeft size={16} />
            Voltar
          </Button>
        )}
        <Button
          variant="primary"
          size="full"
          className="flex items-center justify-center gap-2"
          onClick={handleStepIncrease}
        >
          {step === 3 ? "Criar conta" : "Continuar"}
          {step !== 3 && <MoveRight size={16} />}
        </Button>
      </div>
      <Link to="/auth/signin" className="text-xs text-center text-dark-blue">
        Já tem uma conta? <span className="underline">Entre aqui</span>
      </Link>
    </div>
  );
};
