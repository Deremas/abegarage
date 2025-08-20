import React from 'react';
import image3 from "../../../assets/images/image3.jpg";

const QualityFeatureSection = () => {
  return (
    <section className="features-section">
      <div className="auto-container">
        <div className="row" style={{ margin: 0 }}>
          {/* Left Section - Red Background with Text */}
          <div className="col-lg-6" style={{ padding: 0 }}>
            <div className="inner-container" style={{
              background: '#ee0c0a',
              padding: '20px 10px 10px 0px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
            }}>
              <h2 style={{
                fontSize: '38px',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: '25px',
                color: 'white',
                textTransform: 'none'
              }}>
                Quality Service And <br/> Customer Satisfaction !!
              </h2>
              <div className="text" >
                We utilize the most recent symptomatic gear to ensure your vehicle is fixed or adjusted appropriately and in an opportune manner. We are an individual from Professional Auto Service, a first class execution arrange, where free assistance offices share shared objectives of being world-class car administration focuses.
              </div>
            </div>
          </div>
          
          {/* Right Section - Car Dashboard Image */}
          <div className="col-lg-6" style={{ padding: 0 }}>
            <div className="image">
              <img 
                src={image3} 
                alt="Car dashboard with tachometer and warning lights" 
                style={{
                  width: '100%',
                  height: '80%',
                  objectFit: 'cover',
                  objectPosition: 'right'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityFeatureSection;