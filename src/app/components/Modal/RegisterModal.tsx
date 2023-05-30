"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from ".";
import Heading from "../Heading";
import Input from "../Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const Inputs = [
  {
    id: "name",
    label: "Name",
    type: "text",
    required: true,
  },
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
  {
    id: "confirmPassword",
    label: "Confirm Password",
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

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const axiosConfig = {
      method: "post",
      url: "/api/auth/register",
      data,
    };
    try {
      await axios(axiosConfig);
      registerModal.onClose();
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to AirBnB" subtitle="Create an account" />
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
          <div>Already have an account?</div>
          <div
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={registerModal.onClose}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
