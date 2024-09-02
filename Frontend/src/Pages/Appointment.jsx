import React from 'react'
import Hero from '../Components/Hero'
import AppointmentForm from "../Components/AppointmentForm";



const Appointment = () => {
  return (
    <>
    <Hero title={"Schedual Your Appointment | FA CARE"} imageUrl={"/signin.png"}/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment