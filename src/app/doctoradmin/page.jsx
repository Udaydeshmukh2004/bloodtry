"use client";
import React, { useState, useEffect, useCallback } from "react";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
import { useData } from "../../../context/DataContext";

function AppointmentsPage() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { currUser } = useData();

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/appointment/${currUser?._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      if (data.appointments && Array.isArray(data.appointments)) {
        setAppointments(data.appointments);
        console.log('Appointments fetched successfully:', data.appointments);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
      // Handle error state or display a message to the user
      setAppointments([]); // Set appointments to empty array on error
    }
  }, [currUser?._id]);

  useEffect(() => {
    if (currUser?._id) {
      fetchAppointments();
    }
  }, [fetchAppointments, currUser?._id]);

  const handleRowSelection = (appointmentId) => {
    const isSelected = selectedRows.includes(appointmentId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== appointmentId));
    } else {
      setSelectedRows([...selectedRows, appointmentId]);
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const allAppointmentIds = appointments.map(
        (appointment) => appointment._id
      );
      setSelectedRows(allAppointmentIds);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <>
      <IndexNavbar fixed />
      <div className="my-6 py-6"></div>
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl py-4 border-b mb-0">
            Your latest Appointments
          </h1>
          <button
            onClick={fetchAppointments}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
        </div>

        {appointments.length > 0 ? (
          <div
            className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
            style={{ height: "405px" }}
          >
            <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                    <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox focus:outline-none focus:shadow-outline"
                        onChange={handleSelectAll}
                      />
                    </label>
                  </th>
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    Patient ID
                  </th>
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    Name
                  </th>
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    Email Address
                  </th>
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    Phone
                  </th>
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    Concern
                  </th>
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="border-dashed border-t border-gray-200 px-3">
                      <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                          onChange={() => handleRowSelection(appointment._id)}
                          checked={selectedRows.includes(appointment._id)}
                        />
                      </label>
                    </td>
                    <td className="border-dashed border-t border-gray-200 px-6 py-3">
                      {appointment._id}
                    </td>
                    <td className="border-dashed border-t border-gray-200 px-6 py-3">
                      {`${appointment.name}`}
                    </td>
                    <td className="border-dashed border-t border-gray-200 px-6 py-3">
                      {appointment.email}
                    </td>
                    <td className="border-dashed border-t border-gray-200 px-6 py-3">
                      {appointment.phone}
                    </td>
                    <td className="border-dashed border-t border-gray-200 px-6 py-3">
                      {appointment.concern}
                    </td>
                    <td className="border-dashed border-t border-gray-200 px-6 py-3">
                      {appointment.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </>
  );
}

export default AppointmentsPage;
