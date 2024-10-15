import React from 'react'
import AppointmentForm from "./AppointmentForm";
import Hero from '../Components/Hero'


const Appointment = () => {
  return (
    <>
    <Hero title={"Schedual Your Appointment | FA CARE"} imageUrl={"/signin.png"}/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment