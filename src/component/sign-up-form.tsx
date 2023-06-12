"use client";

import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Button } from "~/ui/button";
import { Textarea } from "~/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs";
import { ScrollArea } from "~/ui/scroll-area";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { api } from "~/trpc/client";
import { useToast } from "~/ui/use-toast";

interface SignUpFormProps {
  linkToSignIn?: boolean;
}

export default function SignUpForm({ linkToSignIn }: SignUpFormProps) {
  const { toast } = useToast();

  const [tabValue, setTabValue] = useState("account");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const organizationNameRef = useRef<HTMLInputElement>(null);
  const organizationDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const organizationFieldRef = useRef<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const organizationName = organizationNameRef.current?.value;
    const organizationDescription = organizationDescriptionRef.current?.value;
    const organizationField = organizationFieldRef.current;

    if (!email || !password || !name) {
      toast({
        variant: "destructive",
        title: "Toloong isi semua form",
      });
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    if (tabValue === "account") {
      try {
        await api.user.createUser.mutate({
          user,
        });
        toast({
          title: "Berhasil membuat akun",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Gagal membuat akun",
        });
      }
      return;
    } else {
      if (!organizationName || !organizationDescription || !organizationField) {
        toast({
          variant: "destructive",
          title: "Toloong isi semua form",
        });
        return;
      }

      const organization = {
        name: organizationName,
        description: organizationDescription,
        field: organizationField,
      };

      try {
        await api.user.createUser.mutate({
          user,
          organization,
        });
        toast({
          title: "Berhasil membuat akun",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Gagal membuat akun",
        });
      }
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <Tabs
        defaultValue="account"
        className="font-sans"
        onValueChange={(e) => {
          setTabValue(e);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">User</TabsTrigger>
          <TabsTrigger value="ukm">UKM</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-col gap-4 ">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="name" className="text-lg text-stone-600">
                Name
              </Label>
              <Input ref={nameRef} type="name" id="name" placeholder="Name" />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email" className="text-lg text-stone-600">
                Email
              </Label>
              <Input
                ref={emailRef}
                type="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="password" className="text-lg text-stone-600">
                Password
              </Label>
              <Input
                ref={passwordRef}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 w-full bg-stone-400 text-lg font-semibold text-white"
            >
              Sign Up
            </Button>
            {/* or */}
            <div className="flex flex-col items-center gap-2">
              <div className="my-5 h-0.5 w-full bg-stone-200">
                <span className="white relative left-1/2 top-1/2 inline-block  -translate-x-1/2 -translate-y-[55%] transform bg-white px-2 text-lg text-stone-600">
                  Or
                </span>
              </div>
              <Button
                className="w-full bg-stone-400 text-lg font-semibold text-white"
                onClick={() => {
                  void signIn("google", {
                    callbackUrl: "/",
                  });
                }}
              >
                Sign Up with Google
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="ukm" className="">
          <ScrollArea className="flex max-h-[70vh]  flex-col gap-6">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="name" className="text-lg text-stone-600">
                Name
              </Label>
              <Input ref={nameRef} type="name" id="name" placeholder="Name" />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="email" className="text-lg text-stone-600">
                Email
              </Label>
              <Input
                ref={emailRef}
                type="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="password" className="text-lg text-stone-600">
                Password
              </Label>
              <Input
                ref={passwordRef}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="ukm-name" className="text-lg text-stone-600">
                UKM Name
              </Label>
              <Input
                ref={organizationNameRef}
                type="text"
                id="ukm-name"
                placeholder="Nama UKM"
              />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="ukm-field" className="text-lg text-stone-600">
                UKM Field
              </Label>
              <div className=" w-full">
                <Select
                  onValueChange={(value) => {
                    organizationFieldRef.current = value;
                  }}
                >
                  <SelectTrigger className="w-full rounded-md border-stone-300 font-sans">
                    <SelectValue placeholder="Bidang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="font-sans" value="Kepemimpinan">
                      Kepemimpinan
                    </SelectItem>
                    <SelectItem className="font-sans" value="Kesenian">
                      Kesenian
                    </SelectItem>
                    <SelectItem className="font-sans" value="Kewirausahaan">
                      Kewirausahaan
                    </SelectItem>
                    <SelectItem className="font-sans" value="Kemanusiaan">
                      Kemanusiaan
                    </SelectItem>
                    <SelectItem className="font-sans" value="Keagamaan">
                      Keagamaan
                    </SelectItem>
                    <SelectItem className="font-sans" value="Keilmuan">
                      Keilmuan
                    </SelectItem>
                    <SelectItem className="font-sans" value="Olahraga">
                      Olahraga
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label
                htmlFor="ukm-description"
                className="text-lg text-stone-600"
              >
                UKM Description
              </Label>
              <Textarea
                ref={organizationDescriptionRef}
                id="ukm-description"
                placeholder="Deskripsi UKM"
              />
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 w-full bg-stone-400 text-lg font-semibold text-white"
            >
              Sign Up
            </Button>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      {linkToSignIn && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="text-stone-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-stone-400 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
