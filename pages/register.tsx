import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";

type Props = {};

export default function Register({}: Props) {
    const [addrtype, setAddrType] = useState("customer");
    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const values = {
            username: userNameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            role: addrtype,
        };
        axios
            .post("/api/register", values)
            .then((res) => {
                res;
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("dataUser", JSON.stringify(res.data));
                toast.success('Register successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
                router.push("/");
            })
            .catch((err) => {
                err;
                toast.error('Register failled!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            });
    };

    const handleSelect = (e: any) => {
        setAddrType(e.target.value);
    };
    return (
        <div>
            {" "}
            <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto h-10 w-auto'
                        src='super-indo-logo-png-transparent.png'
                        alt='Your Company'
                    />
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={handleSubmit} className='space-y-6' action='#' method='POST'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-gray-900'>
                                Username
                                <span className="ms-2 text-red-500">*</span>
                            </label>
                            <div className='mt-2'>
                                <input
                                    ref={userNameRef}
                                    id='username'
                                    name='username'
                                    type='text'
                                    autoComplete='email'
                                    required
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-gray-900'>
                                Email address
                                <span className="ms-2 text-red-500">*</span>
                            </label>
                            <div className='mt-2'>
                                <input
                                    ref={emailRef}
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                    <span className="ms-2 text-red-500">*</span>
                                </label>
                                <div className='text-sm'>
                                    <a
                                        href='#'
                                        className='font-semibold text-indigo-600 hover:text-indigo-500'>
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <input
                                    ref={passwordRef}
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>
                        <div>
                            <label>
                                Pick a Role:
                                <span className="ms-2 text-red-500">*</span>
                                <select onChange={handleSelect} name='selectedRole' className="mx-4 px-1 py-1 bg-transparent border-b-2 border-black">
                                    <option value='customer'>Customer</option>
                                    <option value='admin'>Admin</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Have an Account ?
                        <button
                            onClick={() => router.push("/login")}
                            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
