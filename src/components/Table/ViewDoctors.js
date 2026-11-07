'use client'
import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ViewDoctors = ({ name, email, contact, address, doctorId, specialization, degree }) => {
  const { currUser } = useData();
  const [showPopover, setShowPopover] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: currUser?.name,
    email: currUser?.email,
    phone: currUser?.phone,
    address: currUser?.address,
    doctorId: doctorId,
    patientId: currUser?._id,
    concern: 'paining in the chest'
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setAppointmentForm({
  //     ...appointmentForm,
  //     [name]: value,
  //   });
  // };

  // const handleAppointmentSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform logic to submit the appointment request (e.g., make API call)
  //   console.log(`Appointment reason submitted: ${appointmentForm.concern}`);

  //   // Close the popover after submission
  //   setShowPopover(false);
  // };

  const handleButtonClick = async () => {
    if (!currUser) {
      toast.warn("Please log in to book an appointment", {
        position: "top-center"
      });
      return;
    }

    const appointmentData = {
      name: currUser.name,
      email: currUser.email,
      phone: currUser.phone,
      address: currUser.address,
      doctorId: doctorId,
      patientId: currUser._id,
      concern: 'paining in the chest'
    };

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.status === 201) {
        const responseData = await response.json();
        console.log('Appointment created:', responseData.msg);
        // Handle success (e.g., show confirmation to user)
        toast.success("Your Request Has been sent, will get back to you soon", {
          position: "top-center"
        });
      } else if (response.status === 409) {
        // Handle scenario where an appointment request already exists
        toast.warn('An appointment request already exists for this patient and doctor', {
          position: 'top-center'
        });
      } else {
        // Handle other non-successful response statuses
        const errorText = await response.text();
        console.error('Appointment creation failed:', errorText);
        // Display a generic error message to the user
        toast.error('Failed to create appointment. Please try again later.', {
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Appointment creation error:', error.message);
      // Handle network or other errors
      toast.error('Network error. Please check your internet connection.', {
        position: 'top-center'
      });
    }
  };






  return (
    <tr>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {name}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {email}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {degree}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {specialization} {"  "}4 years
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {contact}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {address}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button
          onClick={handleButtonClick}
          className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Click Here
        </button>

        {/* Render the popover based on showPopover state */}
        {/* {showPopover && (
          <div className="popover absolute bg-white border border-gray-300 p-4 rounded shadow">
            <form onSubmit={handleAppointmentSubmit}>
              <label htmlFor="reason" className="block mb-2">
                Reason for Appointment:
              </label>
              <input
                type="text"
                id="reason"
                name="concern"
                value={appointmentForm.concern}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )} */}
      </td>
    </tr>
  );
};

export default ViewDoctors;
