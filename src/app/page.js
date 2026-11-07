"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import IndexNavbar from "@/components/Navbars/IndexNavbar.js";
import Footer from "@/components/Footers/Footer.js";
import Layout from "@/components/Layout";
export default function Index() {
  return (
    <Layout title="Home / Blood Care">
      <IndexNavbar fixed />
      <section className="header ml-10 mr-10 relative pt-16 items-center flex h-screen max-h-860-px bg-white">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
              Blood Camp: Transforming Healthcare with Predictive AI
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
              Welcome to the BloodCare Blood Camp, where we bring revolutionary healthcare to your doorstep. BloodCare harnesses the power of predictive AI to optimize blood management, ensuring swift and efficient responses to blood-related emergencies. Join us at our camp as we integrate cutting-edge speech analysis, text extraction, and computer vision technologies to transform the way we address urgent blood-related assistance.
              </p>
              <div className="mt-12">
                <Link href="/bloodcamp">
                  <button className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-800 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Organize
                  </button>
                </Link>

                {/* <a
                  href="https://github.com/sarvesh2902/Hackanova_CTRL-ALT-ELITE"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github Repo
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 b-auto right-0 pt-16 sm:w-5/12 -mt-38 sm:mt-0 w-9/12 max-h-830-px">
          <Image
            src="https://bridgentech.com/wp-content/uploads/2023/06/Healthcare.gif"
            alt="Healthcare"
            width={500} // Set an appropriate width
            height={500}
          />
        </div>
      </section>

      <section
        id="main"
        className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100"
      >
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        {/* <h3 className="flex justify-center font-medium text-xl mb-3">Awareness from UNICEF</h3> */}
        {/* <YoutubeVideo/> */}

        <div className="container mx-auto mt-36">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
              <div className="w-full align-middle rounded-t-lg relative h-64">
                  <Image
                    alt="Health Insurance"
                    src="https://www.policybazaar.com/pblife/assets/images/pb_life_How_to_increase_Health_insurance_cover_1592063367.gif"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

                <blockquote className="relative p-6 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl mt-0 font-bold text-white">
                  Healthcare emergency response system
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  The objective of IntelliCare  is to deploy cutting-edge AI, 
                  machine learning, and telemedicine technologies to craft an 
                  all-encompassing healthcare emergency response system. our
                   proposed solution seeks to redefine emergency medical services,
                    placing a premium on compassionate and swift decision-making. 
                  </p>
                </blockquote>
              </div>
            </div>
            <div id="sol" className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div  className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                          />
                        </svg>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      Automated flagging:
                      </h6>
                      <p className="mb-4 text-blueGray-500">
              
                      Implementing a system that automatically identifies and flags potential instances of cyber bullying based on predefined criteria, enabling timely detection.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                          />
                        </svg>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      Reporting mechanism: 
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                      Establishing a user-friendly and accessible platform for individuals to report instances of cyber bullying, facilitating effective reporting and intervention
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                          />
                        </svg>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      Incident tracking:
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        
                       Developing a robust system to track and monitor reported cyber bullying incidents, enabling efficient management and follow-up actions.
                
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                          />
                        </svg>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                      Filtering and blocking:
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                       Implementing effective filters and blocking mechanisms to prevent cyber bullying content from being displayed or circulated, promoting a safer online environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <h3 className="font-semibold text-3xl">Let&apos;s get started</h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Blood Care
              </p>
              <div className="sm:block flex flex-col mt-10">
                <Link href="/">
                  <div className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-800 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Get started
                  </div>
                </Link>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </Layout>
  );
}
