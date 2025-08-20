import React from 'react';
import vban1 from "../../../assets/template_assets/images/custom/misc/vban1.jpg";
import vban2 from "../../../assets/template_assets/images/custom/misc/vban2.jpg";

const ExperienceSection = () => {
  // Calculate years of experience from 1992 to current year
  const START_YEAR = 1992;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - START_YEAR;

  // Content data for better maintainability
  const content = {
    subtitle: "Welcome to our workshop",
    title: `We have ${yearsOfExperience} years experience`,
    paragraphs: [
      "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.",
      "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing."
    ],
    buttonText: "ABOUT US",
    buttonLink: "/about"
  };

  return (
    <section className="about-section">
      <div className="auto-container">
        <div className="row">
          {/* Left Column - Images */}
          <div className="col-lg-5">
            <div className="image-box">
              <img 
                src={vban1} 
                alt="Oil pouring into funnel - automotive service" 
                className="experience-image"
              />
              <img 
                src={vban2} 
                alt="Automotive parts collection - workshop tools" 
                className="experience-image"
              />
              <div 
                className="year-experience" 
                data-parallax='{"y": 30}'
              >
                <strong>{yearsOfExperience}</strong> YEARS <br/> 
                EXPERIENCE
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="col-lg-7 pl-lg-5">
            <div className="sec-title">
              <h5>{content.subtitle}</h5>
              <h2>{content.title}</h2>
              
              <div className="text">
                {content.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="link-btn mt-40">
                <a 
                  href={content.buttonLink} 
                  className="theme-btn btn-style-one style-two"
                  aria-label={`Navigate to ${content.buttonText} page`}
                >
                  <span>
                    {content.buttonText} 
                    <i className="flaticon-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
