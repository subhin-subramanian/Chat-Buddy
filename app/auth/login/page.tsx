    "use client"

    import Logo from "@/components/Logo";
    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import Image from "next/image";
    import Link from "next/link";
    import { FormEvent, useState } from "react";
    import CoverImg from '../../../assets/CoverImg.png';
    import toast from "react-hot-toast";
    import { useRouter } from "next/navigation";
    import { login } from "@/lib/api";
    import { ILogInData, ILoginResponse } from "@/app/types";

    function LoginPage() {
    
    const [ logInData, setLogInData ] = useState<ILogInData>({email:'',password:''});
    const queryClient = useQueryClient();
    const router = useRouter();

    const {mutate:logInMutation, isPending, error} = useMutation <ILoginResponse,Error,ILogInData>({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(["auth", "user"], data.user);
            toast.success("Logged In");
            router.push('/');
        },
        onError: (err) =>{
            toast.error(err.message);
        }
    });

    const handleSubmit = (e: FormEvent) =>{
        e.preventDefault();
        logInMutation(logInData);
    }

    return (
      <div className='flex justify-center items-center min-h-screen p-4 pb-15 sm:p-6 md:p-8'>
          <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 shadow-lg rounded-lg overflow-hidden">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col space-y-5">
              <Logo/>
              <div>
                <h2 className='text-xl font-semibold'>Welcome Back</h2>
                <p className='text-sm opacity-70'>Log in to continue to chat_buddy</p>
              </div>
    
              {/* form */}
              <form className='space-y-3' onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-control w-full">
                  <label className="label" htmlFor='email'>
                    <span className="label-text">Email</span>
                  </label>
                  <input 
                    type='email'
                    id='email'
                    className='input input-bordered w-full'
                    placeholder='Enter your email'
                    value={logInData.email}
                    onChange={(e) => setLogInData({ ...logInData,email:e.target.value})}/>
                </div>
                {/* Password */}
                <div className="w-full">
                  <label className="label" htmlFor='password'>
                    <span className="label-text">Password</span>
                  </label>
                  <input 
                    type='password'
                    id='password'
                    className='input border-2 w-full'
                    placeholder='Enter a password'
                    value={logInData.password}
                    onChange={(e) => setLogInData({ ...logInData,password:e.target.value})}/>
                </div>
    
                <button className='btn btn-primary w-full' type='submit'>
                      {isPending ? 
                      <>
                      <span className='loading loading-spinner loading-xs'>Logging In....</span>
                      </>: "Log In"}
                </button>
    
                <div className="flex items-center justify-center mt-2 gap-2">
                    <p>Don't have an account?</p>
                    <Link href="/auth/signup" className='text-primary font-semibold hover:underline'>Create-Account</Link>
                </div>
    
              </form>
    
              {error && <span className="alert alert-error">{error.message || "Something went wrong"}</span>}
    
            </div>
            {/* Right Side */}
            <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col items-center">
              <div className="max-w-md p-8">
                {/* Illustration */}
                <div className="relative aspect-square max-w-sm mx-auto">
                    <Image src={ CoverImg } alt="Img" fill 
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority/>
                </div>
                <div className="text-center space-y-3 mt-6">
                  <h2 className='text-xl font-semibold'>Connect with your friends worldwide</h2>
                  <p>Find people with your similar interests and create an amazing friends net</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default LoginPage
