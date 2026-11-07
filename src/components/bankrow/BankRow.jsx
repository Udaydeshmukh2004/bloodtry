"use client";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
function BankRow({ name, email, address, contact, userId, bankId, formData }) {
  console.log("hospital", formData);
  const [request, setrequest] = useState(false);
  const reqForm = {
    name: name,
    bankContact: contact,
    bloodType: formData.bloodType,
    address: formData.address,
    quantity: formData.quantity,
    urgent: formData.urgent,
    hospitalName: formData.hospitalName,
  };
  const handleRequestBlood = async () => {
    // Logic to handle blood request

    if (!request) {
      const confirmed = window.confirm(
        "Are you sure you want to proceed with the blood request?"
      );
      if (confirmed) {
        try {
          const res = await fetch("/api/otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqForm),
          });
          if (res.ok) {
            toast.success("Blood request sent to " + name, {
              position: "top-center",
            });
            setrequest(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } else {
      toast.warn("You can only Attemt one at a time" + name, {
        position: "top-center",
      });
    }
  };

  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <Image
          src="https://demos.creative-tim.com/notus-js/assets/img/bootstrap.jpg"
          height={48}
          width={48}
          className="h-12 w-12 bg-white rounded-full border"
          alt="Bootstrap logo"
        />
        <span className="ml-3 font-bold text-white"> {name} </span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        A+
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <i className="fas fa-circle text-orange-500 mr-2" />
        units
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex">{contact}</div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <span className="ml-3 font-bold text-white"> {address} </span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <span className="ml-3 font-bold text-white">
          {" "}
          <button
            type="button"
            onClick={handleRequestBlood}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Request blood
          </button>{" "}
        </span>
      </td>
    </tr>
  );
}

export default BankRow;
