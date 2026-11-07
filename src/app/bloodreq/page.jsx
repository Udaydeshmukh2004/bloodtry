"use client";
import React, { useEffect, useState } from "react";
import BankRow from "@/components/bankrow/BankRow";
import { useData } from "../../../context/DataContext";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
import { ToastContainer, toast } from 'react-toastify';

const Bloodreq = () => {
  const { arrData, updateArrData, currUser } = useData();
  
  const [formData, setformData] = useState({
    bloodType: "apos",
    quantity: 0,
    urgent: "",
    reason: "brainStrom",
    hospitalName: "",
    address:"",
    userId:currUser ? currUser._id : null
  });

  
  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log("form data",formData);
    setformData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/getbanks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse the response as JSON
      const data = await res.json();
      console.log(data.availableBloodbanks);
      if (res.status === 200) {
        updateArrData(data.availableBloodbanks || []);
        // Alert that blood is available
        toast.success("The required blood is available", {
          position: "top-center"
        });
      } else if (res.status === 404) {
        updateArrData([]);
        toast.warn("The required blood is not available", {
          position: "top-center"
        });
      } else {
        toast.error("Failed to check blood availability", {
          position: "top-center"
        });
      }
      
      const targetDiv = document.getElementById("scroll-div");
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      // Handle any errors
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
    <IndexNavbar fixed />
      <div className="container mx-auto mt-12 px-4">
        <h1 className="text-3xl font-semibold mb-4">Request Blood</h1>
        <form
          className="bg-white p-12 m-12 rounded-lg shadow-2xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="shadow-lg">
              <label
                htmlFor="bloodType"
                className="block text-lg font-medium text-gray-700 "
              >
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
              >
                <option value="apos">A+</option>
                <option value="aneg">A-</option>
                <option value="bpos">B+</option>
                <option value="bneg">B-</option>
                <option value="abpos">AB+</option>
                <option value="abneg">AB-</option>
                <option value="opos">O+</option>
                <option value="oneg">O-</option>
              </select>
            </div>
            <div className="shadow-lg">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity Needed (in units)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                onChange={handleChange}
                value={formData.quantity}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
              />
            </div>
          </div>
          <div className="mt-6 shadow-lg">
            <label
              htmlFor="urgency"
              className="block text-sm font-medium text-gray-700"
            >
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              onChange={handleChange}
              value={formData.urgency}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            >
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="mt-6 shadow-lg">
            <label
              htmlFor="disease"
              className="block text-sm font-medium text-gray-700"
            >
              Operation Type
            </label>
            <select
              id="disease"
              name="disease"
              onChange={handleChange}
              value={formData.disease}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            >
              <option value="brainStrom">brainStrom</option>
              <option value="normal">Normal</option>
              <option value="gynac">gynac</option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="mt-6 shadow-md">
            <label
              htmlFor="hospital"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital Name
            </label>
            <input
              type="text"
              id="hospitalNama"
              name="hospitalName"
              onChange={handleChange}
              value={formData.hospitalName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            />
          </div>
          <div className="mt-6 shadow-md">
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              onChange={handleChange}
              value={formData.address}
              className="mt-1 block h-40 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            ></textarea>
          </div>
          <div className="mt-6 shadow-mg">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* ////////// */}

      <section className="relative py-16 bg-blueGray-50" id="scroll-div">
        <div className="w-full mb-12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
    bg-pink-900 text-white"
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-white">
                    Blood Banks
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Name
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Blood G+-
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Quantity
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Contact
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Address
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Request for blood
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700" />
                  </tr>
                </thead>
                <tbody>
                  {arrData &&
                    arrData.map((item, index) => (
                      <BankRow
                        key={index}
                        name={item.name}
                        email={item.email}
                        contact={item.phone}
                        address={item.address}
                        userId={item.userId}
                        bankId={item._id}
                        formData={formData}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bloodreq;
