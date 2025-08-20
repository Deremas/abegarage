import React from 'react'
import { Link } from 'react-router-dom'
import service_bg from "../../assets/images/background/bg2.png"
import ServicesSection from '../components/ServicesSection/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs'
import BannerSection from '../components/BannerSection/BannerSection'
import CTASection from '../components/CTASection/CTASection'

function Services() {
  return (
    <>
      <div 
        className="services-hero"
        style={{
          backgroundImage: `url(${service_bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '10rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          position: 'relative'
        }}
      >
        <div>
          <h1 style={{color: 'white', paddingLeft: "1.5rem"}}>
            Our Services
          </h1>
          <br />
          <nav style={{paddingLeft: "2rem"}}>
            <Link 
              to="/" 
            >
              Home
            </Link>
            <span style={{paddingLeft: ".5rem", paddingRight: ".5rem"}}>
              &gt;
            </span>
            <Link 
              to="/services" 
              style={{color: "white"}}
            >
              Services
            </Link>
          </nav>
        </div>
      </div>
      <ServicesSection/>
      <WhyChooseUs/>
      <BannerSection/>
      <CTASection/>
    </>
  )
}

export default Services