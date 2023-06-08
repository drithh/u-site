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
export default function SignUp() {
  return (
    <div className="mt-8 flex flex-col place-items-center gap-4 border-2 border-solid border-stone-200 pb-8 pt-4  font-serif">
      <h1 className="text-[5rem] font-bold">Sign Up</h1>
      <div className="w-4/5 border-y-2 border-solid border-stone-200 px-8 py-4">
        <SignUpForm linkToSignIn />
      </div>
    </div>
  );
}

interface SignUpFormProps {
  linkToSignIn?: boolean;
}

export function SignUpForm({ linkToSignIn }: SignUpFormProps) {
  return (
    <>
      <Tabs defaultValue="account" className="font-sans">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">User</TabsTrigger>
          <TabsTrigger value="ukm">UKM</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-col gap-4 ">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email" className="text-lg text-stone-600">
                Email
              </Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="password" className="text-lg text-stone-600">
                Password
              </Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <Button
              type="submit"
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
                type="submit"
                className="w-full bg-stone-400 text-lg font-semibold text-white"
              >
                Sign Up with Google
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="ukm" className="">
          <ScrollArea className="flex max-h-[70vh]  flex-col gap-6">
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="email" className="text-lg text-stone-600">
                Email
              </Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="password" className="text-lg text-stone-600">
                Password
              </Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="ukm-name" className="text-lg text-stone-600">
                UKM Name
              </Label>
              <Input type="text" id="ukm-name" placeholder="Nama UKM" />
            </div>
            <div className="mt-6 w-full  items-center gap-1.5">
              <Label htmlFor="ukm-field" className="text-lg text-stone-600">
                UKM Field
              </Label>
              <div className=" w-full">
                <Select>
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
              <Textarea id="ukm-description" placeholder="Deskripsi UKM" />
            </div>
            <Button
              type="submit"
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
                type="submit"
                className="w-full bg-stone-400 text-lg font-semibold text-white"
              >
                Sign Up with Google
              </Button>
            </div>
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
