import React from 'react'
import Hero from '../../student/Hero'
import Companies from '../../student/Companies'
import CoursesSection from '../../student/CoursesSection'
import TestimonialSection from '../../student/TestimonialSection'
import CallToAction from '../../student/CallToAction'
import Footer from '../../student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'><Hero/>
    <Companies/>
    <CoursesSection/>
    <TestimonialSection/>
    <CallToAction/>
    <Footer/>
    </div>
    
  )
}

export default Home