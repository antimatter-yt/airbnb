"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
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
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await signIn('credentials', {...values, redirect:false})
    .then(() => {
      toast({
        title: "Login Successfully",
        description: "..",
      });
      router.refresh()
      loginModal.onClose();
    })
    .catch((error) => {
      toast({
        title: "Error while login",
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            onClick={() => signIn("github")}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
            <div>New user here? </div>
            <div className=" text-neutral-800 cursor-pointer hover:underline"
            onClick={() => {loginModal.onClose(); registerModal.onOpen()}}
            >
              Sign up
            </div>
          </div>
      </div>
    </>
  );
  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Log in"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
