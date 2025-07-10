import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { Input } from "../components/input";
import { MoveLeft, MoveRight, Image, Loader2 } from "lucide-react";
import { useState } from "react";
import { ProfilePreview } from "./components/profile-preview";
import { ProgressBar } from "./components/progress-bar";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserFormSchema,
  type createUserFormDataSchema,
} from "./components/types";
import { useAuth } from "../../../hooks/useAuth";
import { uploadProfilePicture } from "../../../services/uploadProfilePicture";

export const SignUp = () => {
  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isStepLoading, setIsStepLoading] = useState(false);

  const { register: createUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<createUserFormDataSchema>({
    resolver: zodResolver(createUserFormSchema),
  });

  const stepFields: Record<number, Array<keyof createUserFormDataSchema>> = {
    1: ["fullName", "email"],
    2: ["password", "confirmPassword"],
    3: ["profilePicture"],
  };

  const handleStepIncrease = async () => {
    setIsStepLoading(true);

    const currentFields = stepFields[step];
    const valid = await trigger(currentFields);

    if (valid) {
      if (step < 3) {
        setStep(step + 1);
        setIsStepLoading(false);
      } else {
        await handleSubmit(async (data) => {
          await onSubmit(data);
          setIsStepLoading(false);
        })();
      }
    } else {
      setIsStepLoading(false);
    }
  };

  const handleStepdDecrease = () => {
    setStep(step - 1);
  };

  const watchedFullName = watch("fullName");
  const watchedEmail = watch("email");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue("profilePicture", file);
      trigger("profilePicture");
    }
  };

  const onSubmit = async (data: createUserFormDataSchema) => {
    const fullName = data.fullName.trim();
    const email = data.email.trim();
    const password = data.password.trim();
    const profilePicture = data.profilePicture;

    let profilePictureUrl = "";
    if (profilePicture) {
      try {
        profilePictureUrl = await uploadProfilePicture(profilePicture, email);
      } catch (error) {
        console.log(error);
      }
    }

    await createUser({
      fullName,
      email,
      password,
      profilePicture: profilePictureUrl,
    });
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
              <div className="w-full flex flex-col gap-2">
                <Input
                  id="name"
                  placeholder="Digite o seu nome completo"
                  {...register("fullName")}
                  className={`${errors.fullName && "border-red-500"}`}
                />
                {errors.fullName && (
                  <span className="text-sm text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>
            </div>
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
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm">
                Nova senha
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
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirmar senha
              </label>
              <div className="w-full flex flex-col gap-2">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme a sua senha"
                  {...register("confirmPassword")}
                  className={`${errors.password && "border-red-500"}`}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="w-full max-h-full flex flex-col gap-6">
              <ProfilePreview
                fullName={watchedFullName}
                email={watchedEmail}
                profilePicture={previewUrl ?? undefined}
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="text-sm">
                  Escolher foto de perfil
                </label>
                <Input
                  id="file"
                  type="file"
                  className="hidden"
                  {...register("profilePicture")}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="file"
                    className={`w-full flex items-center justify-center gap-2 px-4 h-[3rem] rounded border ${
                      errors.profilePicture
                        ? " border-red-500"
                        : "border-dark-blue/50"
                    } text-dark-blue/50 cursor-pointer`}
                  >
                    Selecionar foto de perfil
                    <Image size={18} />
                  </label>
                  {errors.profilePicture && (
                    <span className="text-sm text-red-500">
                      {(errors.profilePicture as FieldError).message}
                    </span>
                  )}
                </div>
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
          disabled={isLoading || isStepLoading}
        >
          {isLoading || isStepLoading ? (
            <Loader2 size={16} className="text-white animate-spin" />
          ) : (
            <>
              {step === 3 ? "Criar conta" : "Continuar"}
              {step !== 3 && <MoveRight size={16} />}
            </>
          )}
        </Button>
      </div>
      <Link to="/auth/signin" className="text-xs text-center text-dark-blue">
        Já tem uma conta? <span className="underline">Entre aqui</span>
      </Link>
    </div>
  );
};
