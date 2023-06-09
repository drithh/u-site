import SignUpForm from "~/component/sign-up-form";

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
