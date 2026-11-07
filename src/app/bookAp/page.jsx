"use client";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
// import TransportForm from "@/components/TransportForm";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewDoctors from "@/components/Table/ViewDoctors";
import Footer from "@/components/Footers/Footer.js";
import { useEffect, useState } from "react";
export default function Fertilizer() {
  // const doctors = [
  //   {
  //     Doc_name: 'Doctor 1',
  //     Doc_email: 'doctor1@example.com',
  //     Doc_edu: 'MD',
  //     Doc_spl: 'Cardiology',
  //     Doc_exp: '10 years',
  //     Doc_lang: 'English',
  //   },
  //   {
  //     Doc_name: 'Manan mitesh joshi',
  //     Doc_email: 'doctor1@example.com',
  //     Doc_edu: 'MD',
  //     Doc_spl: 'Cardiology',
  //     Doc_exp: '6 years',
  //     Doc_lang: 'English',
  //   },
  //   {
  //     Doc_name: 'Doctor 1',
  //     Doc_email: 'doctor1@example.com',
  //     Doc_edu: 'MD',
  //     Doc_spl: 'Cardiology',
  //     Doc_exp: '3 years',
  //     Doc_lang: 'English',
  //   }
  //   // Add more doctors as needed
  // ];
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await fetch("/api/auth/user");
        const doctorss = await res.json();
        console.log("doctors list", doctorss);
        // Ensure that the fetched data is an array before setting it to state
        if (Array.isArray(doctorss.users)) {
          setDoctors(doctorss.users);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDoctors();
  }, []);

  return (
    <>
      <div title="Appointment Services">
        <IndexNavbar fixed />
        <ToastContainer position="top-center" />
        <div className="w-full px-20 mr-auto ml-auto mt-10 bg-white">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
            <Image
              alt="..."
              src="https://cdn.dribbble.com/users/1485099/screenshots/5944791/schedule-appointment.gif"
              className="w-fit h-auto mx-auto rounded-t-lg"
              width={500} // Set an appropriate width
              height={500} // Set an appropriate height
            />
            <blockquote className=" bg-white relative p-8 mb-4 bg-blueGray-700">
              <h4 className="text-xl font-bold text-white justify-center bg-blueGray-700">
                Top-Notch Medical Appointment Facilities
              </h4>
              <p className="text-lg font-light mt-2 text-white bg-blueGray-700">
                Designed to streamline the process of scheduling appointments
                with healthcare professionals. This system allows patients to
                conveniently book appointments with doctors, specialists, or
                other healthcare providers. The services may include online
                platforms or traditional phone-based scheduling.
              </p>
            </blockquote>
          </div>
        </div>
        {/* < ViewDoctors doctors={doctors} /> */}
        <section className="relative py-16 bg-blueGray-50" id="scroll-div">
          <div className="w-full mb-12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900 text-white">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-white">
                      Blood Banks
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        Name
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        Email
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        Education
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        Specialization
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        Contact
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        address
                      </th>
                      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-700 text-white">
                        Get an appointment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors &&
                      doctors.map((item, index) => (
                        <ViewDoctors
                          key={index}
                          name={item.name}
                          email={item.email}
                          contact={item.phone}
                          address={item.address}
                          doctorId={item._id}
                          specialization={item.specialization}
                          degree={item.degree}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap mt-44 justify-center bg-white">
          <div className="bg-white w-10/12 md:w-6/12 lg:w-6/12 px-22 md:px-8 mr-auto ml-auto -mt-32">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
              <Image
                alt="..."
                src="https://i.pinimg.com/originals/33/ba/21/33ba21ccda561739ab950d66e5616b82.gif"
                className="w-full align-middle rounded-t-lg"
                width={500} // Set an appropriate width
                height={500} // Set an appropriate height
              />
              <blockquote className="relative p-8 mb-4">
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
                <h4 className="text-xl font-bold text-white">
                  Offline Appointment Booking:
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  Traditional method involving calls or in-person visits to
                  schedule face-to-face consultations, suitable for those
                  preferring physical examinations at the doctor&apos;s clinic
                  or healthcare facility.
                </p>
              </blockquote>
            </div>
          </div>

          <div className="bg-white w-10/12 md:w-6/12 lg:w-6/12 px-22 md:px-8 mr-auto ml-auto -mt-32">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
              <Image
                alt="..."
                src="https://cdn.dribbble.com/users/4334101/screenshots/13858125/media/0f1000e10853678e0ab7e880de5bf48e.gif"
                className="w-full align-middle rounded-t-lg"
                width={500} // Set an appropriate width
                height={500} // Set an appropriate height
              />
              <blockquote className="relative p-8 mb-4">
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
                <h4 className="text-xl font-bold text-white">
                  Online Appointment Booking
                </h4>
                <p className="text-md font-light mt-2 text-white">
                  Schedule virtual consultations and telemedicine appointments
                  through Google meet, offering convenience for minor concerns
                  or when in-person visits are not required.{" "}
                </p>
              </blockquote>
            </div>
          </div>

          <p className="text-lg font-dark leading-relaxed px-10 mt-4 mb-2 text-blueGray-800">
            Each mode of transport has its own advantages and disadvantages, and
            the choice of mode will depend on factors such as the type of goods
            being transported, the urgency of the shipment, and the budget
            available for transport.{" "}
          </p>
          <p className="text-lg font-dark leading-relaxed px-10 mt-2 mb-8 text-blueGray-800">
            A well-designed supply chain will often use a combination of these
            modes to optimize the movement of goods from origin to destination.
          </p>

          <h3 className="text-3xl mb-6 font-semibold leading-normal">
            Enter details to get Transportation Recommendations
          </h3>

          <div className="w-full mb-12 xl:mb-0 px-4">
            {/* <ViewComplaint/> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
