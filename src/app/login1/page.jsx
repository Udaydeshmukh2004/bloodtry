"use client";
import axios from 'axios';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            // Handle non-OK response
            if (response.status === 401) {
              toast.warn("Unauthorized access. Please check your credentials.", {
                position: "top-center"
              });
                
            } else if (response.status === 400) {
              toast.warn("Password Wrong", {
                position: "top-center"
              });
            } else {
                alert("An error occurred while processing your request.");
            }
            return;
        }

        const data = await response.json();

        if (data.success) {
            // Handle successful login
            toast.success(data.message, {
              position: "top-center"
            });
            router.push('/');
        } else {
            // Handle failure response
            alert("An error occurred while processing your request.");
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle network or other errors
        alert("An error occurred while processing your request.");
    }
};


  
  return (
    <>
      <IndexNavbar fixed />
      <div className="bg-white rounded-lg py-5">
        <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
          <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            <div className="flex items-center justify-center w-full lg:p-12">
              <div className="flex items-center xl:p-10">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                >
                  <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                    Sign In
                  </h3>
                  <p className="mb-4 text-grey-700">
                    Enter your email and password
                  </p>
                  {/* <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
              <img
                className="h-5 mr-2"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                alt=""
              />
              Sign in with Google
            </a> */}
                  <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />

                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  </div>
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm text-start text-grey-900"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="mail@loopple.com"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  />
                  <label
                    htmlFor="password"
                    className="mb-2 text-sm text-start text-grey-900"
                  >
                    Password*
                  </label>
                  <input
                    name="password"
                    onChange={handleChange}
                    value={formData.value}
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  />

                  {/* <div className="flex flex-row justify-between mb-8">
              <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked=""
                  defaultValue=""
                  className="sr-only peer"
                />
                <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                  <img
                    className=""
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                    alt="tick"
                  />
                </div>
                <span className="ml-3 text-sm font-normal text-grey-900">
                  Keep me logged in
                </span>
              </label>
              <a
                href="javascript:void(0)"
                className="mr-4 text-sm font-medium text-purple-blue-500"
              >
                Forget password?
              </a>
            </div> */}
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    Sign In
                  </button>
                  <p className="text-sm leading-relaxed text-grey-900">
                    Not registered yet?{" "}
                    <Link href="/signup"> Create a new Account</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
