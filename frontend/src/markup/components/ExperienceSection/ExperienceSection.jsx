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
          {/* Left Column - Images with Flexbox Layout */}
          <div className="col-lg-5">
            <div className="image-box" style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '15px',
              position: 'relative',
              height: '400px'
            }}>
              {/* First Image */}
              <div style={{ flex: '1', position: 'relative' }}>
                <img 
                  src={vban1} 
                  alt="Oil pouring into funnel - automotive service" 
                  className="experience-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
              
              {/* Second Image */}
              <div style={{ flex: '1', position: 'relative' }}>
                <img 
                  src={vban2} 
                  alt="Automotive parts collection - workshop tools" 
                  className="experience-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
              
              {/* Experience Overlay - Positioned over the images */}
              <div 
                className="year-experience" 
                data-parallax='{"y": 30}'
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '15px 20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  zIndex: 10
                }}
              >
                <strong style={{ color: '#ee0c0a' }}>{yearsOfExperience}</strong> YEARS <br/> 
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
