import React from 'react'
import Hero from "../Components/Hero"
import Biography from '../Components/Biography'

const AboutUs = () => {
  return (
    <>
     <Hero title={'Learn more about us | FA Care'}  imageUrl={"/about.png"}/>
     <Biography imageUrl={"/whweare.png"} />
    </>
  )
}

export default AboutUs