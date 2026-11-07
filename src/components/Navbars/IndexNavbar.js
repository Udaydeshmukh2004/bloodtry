import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from 'react-toastify';
import { useData } from "../../../context/DataContext";
export default function Navbar(props) {
  const [showUserName, setShowUserName] = useState(true);
  const { arrData, updateArrData, currUser, updatecurrUser } = useData();
  const logoName = currUser ? currUser.name.split(' ')[0].charAt(0).toUpperCase() : '';
  const isDoctor = currUser && currUser.isDoctor;
  console.log("current user", currUser);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    console.log("kjnkas");
  }, []);

  const Logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST"
      })
      if (res.ok) {
        toast.success("Succsessfully logged out ", {
          position: "top-center"
        });
        updatecurrUser();
      }
    } catch (error) {
      toast.warn("you are not logged out, please try again", {
        position: "top-center"
      });
    }
  }

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
      <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <div className="flex flex-row justify-around space-x-1">
            <Image
              src="/blood-care-icon.png"
              alt="BloodCare Icon"
              width={64}
              height={64}
              className="w-16 h-16 object-cover rounded-full cursor-pointer mt-1"
            />
            <Link href="/" className="pt-2">
              <div
                className="text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-2 py-2 whitespace-nowrap uppercase px-2"
              >
                BloodCare
              </div>
            </Link>
          </div>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
            (navbarOpen ? " block" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <Link href="/">
                <div className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                  Home
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/bloodreq">
                <div className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                  BloodReq
                </div>
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/analyze">
                <div className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                  Analyze Reports
                </div>
              </Link>
            </li>
            {isDoctor && (
              <li className="flex items-center">
                <Link href="/doctoradmin">
                  <div className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                    Your Appointment
                  </div>
                </Link>
              </li>
            )}
            <li className="flex items-center">
              <Link href="/bookAp">
                <div className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                  Book Appointment
                </div>
              </Link>
            </li>
            {showUserName && currUser && (
              <>
                <div className="inline-block relative">
                  <div className="w-10 h-10 mr-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">{logoName}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <button onClick={Logout} className="p-2 border border-black text-m uppercase rounded-full rounded-br-none outline-none shadow-lg hover:shadow-xl hover:rounded-full duration-200">Logout</button>
                </div>
              </>
            )}
            {showUserName && !currUser && (
              <>
                <li className="text-sm mr-4 hover:underline md:mr-2">
                  <Link href="/signup">
                    <Image
                      width={45}
                      height={45}
                      src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-signup-call-to-action-bearicons-detailed-outline-bearicons.png"
                      alt="Signup"
                    />
                  </Link>
                </li>
                <li className="text-sm mr-4 hover:underline md:mr-2">
                  <Link href="/login1">
                    <Image
                      width={45}
                      height={45}
                      src="https://img.icons8.com/ios-filled/50/login-rounded-right.png"
                      alt="Login"
                    />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </>
  );
}
