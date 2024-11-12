"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Modal } from "./Modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Heading from "../Heading";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    axios
      .post("/api/register", values)
      .then(() => {
        toast({
          title: "Registered Successfully",
          description: "..",
        });
        registerModal.onClose();
      })
      .catch((error) => {
        toast({
          title: "Error while Registiring",
          description: "...",
          variant: "destructive",
        });
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const bodyContent = (
    <>
      <div className="">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
  const footerContent = (
    <>
      <div className="">
        <div className="flex gap-4 mt-3">
          <Button
            variant="outline"
            label="Continue with google"
            icon={<FcGoogle />}
            onClick={() => signIn("google")}
          />
          <Button
            variant="outline"
            label="Continue with Github"
            icon={<AiFillGithub />}
            onClick={()=>signIn("github")}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
            <div>Already have an account? </div>
            <div 
             onClick={() => {loginModal.onOpen(); registerModal.onClose()}}
            className=" text-neutral-800 cursor-pointer hover:underline">
              Log in
            </div>
          </div>
      </div>
    </>
  );
  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
