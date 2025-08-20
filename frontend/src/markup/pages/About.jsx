import React from 'react'
import { Link } from 'react-router'
import bg2 from "../../assets/images/background/bg2.png"
import tyre from "../../assets/images/carry_tire-BL.png"
import ExperienceSection from '../components/ExperienceSection/ExperienceSection'
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs'
import BottomBanner from '../components/BottomBanner/BottomBanner'
import CTASection from '../components/CTASection/CTASection'

function About() {
  return (
    <div className='page-wrapper'>
      <section className="page-title" style={{ backgroundImage: `url(${bg2})` }}>
        <div className="auto-container">
          <h2>About us</h2>
          <ul className="page-breadcrumb">
            <li><Link to="/">home</Link></li>
            <li>About us</li>
          </ul>
        </div>
      </section>

      <section class="about-section-three">
        <div class="auto-container">
          <div class="row">
            <div class="col-lg-7">
              <div class="content">
                <h2>We are highly skilled mechanics for your car repair</h2>
                <div class="text">
                  <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p><p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional click through from DevOps. Nanotechnology immersion along the information heading towards a streamlined cloud solution. User generated content in real-time will have multiple.</p><p>Abegarage is open and offer services with good price !!!</p>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="image">
                <img src={tyre} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ExperienceSection/>
      <WhyChooseUs/>
      <BottomBanner/>
      <CTASection/>

    </div>
  )
}

export default About