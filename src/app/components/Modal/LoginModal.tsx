"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from ".";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";

const Inputs = [
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];

const Providers = [
  {
    id: "google",
    label: "Continue with Google",
    icon: FcGoogle,
    outline: true,
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: AiFillGithub,
    outline: true,
  },
];

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const login = await signIn("credentials", { ...data, redirect: false });
      if (login?.error) return toast.error(login?.error);
      toast.success("Logged in successfully!");
      // setTimeout(() => {
      router.refresh();
      loginModal.onClose();
      // }, 1000);
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      {Inputs.map((input) => (
        <Input
          key={input.id}
          register={register}
          id={input.id}
          label={input.label}
          type={input.type}
          disabled={isLoading}
          errors={errors}
          required={input.required}
        />
      ))}
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      {Providers.map((provider) => (
        <Button
          key={provider.id}
          outline={provider.outline}
          label={provider.label}
          icon={provider.icon}
          onClick={() => {}}
        />
      ))}
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>{"Don't have an account?"}</div>
          <div
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={() => {
              registerModal.onOpen();
              loginModal.onClose();
            }}
          >
            Sign up!
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
