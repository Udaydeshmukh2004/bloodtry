import { connectDB } from '@/helper/db';
import { NextResponse } from 'next/server';
import AppointmentRequest from '@/models/appointment';

export const POST = async (request) => {
    await connectDB();
    try {
        const { name, email, phone, address, concern, patientId, doctorId } = await request.json();

        console.log(name, email, phone, address, concern, patientId, doctorId);

        // Check if there is an existing appointment for the same patient and doctor
        const existingAppointment = await AppointmentRequest.findOne({ patientId, doctorId});
        if (existingAppointment) {
            // If an appointment already exists, return a response indicating the conflict
            return new NextResponse(JSON.stringify({
                msg: 'Appointment already exists for this patient and doctor',
                appointment: existingAppointment,
                status: 409 // Conflict status code
            }), {
                status: 409,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // If no existing appointment, create a new appointment
        const newAppointment = new AppointmentRequest({
            name,
            email,
            phone,
            address,
            concern,
            patientId,
            doctorId
        });

        console.log(newAppointment);
        await newAppointment.save();

        return new NextResponse(JSON.stringify({
            msg: 'Appointment created',
            status: 201,
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error('Appointment creation error:', err);
        return new NextResponse(JSON.stringify({
            msg: 'Appointment creation failed',
            error: err.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};





