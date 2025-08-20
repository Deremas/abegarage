import React from 'react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection/CTASection'
import contact_bg from "../../assets/images/background/bg2.png"

function Contact() {
  return (
    <>
      <div className="contactus"
        style={{
          backgroundImage: `url(${contact_bg})`,
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
        <div style={{ paddingLeft: "1.5rem" }}>
          <h1 style={{color: "white", marginBottom: "10px"}}>Contact Us</h1>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem'
          }}>
            <Link to="/" style={{color: "red", textDecoration: "none"}}>Home</Link>
            <span style={{paddingLeft: ".5rem", paddingRight: ".5rem"}}>&gt;</span>
            <Link to="/contact" style={{color: "white", textDecoration: "none"}}>Contact Us</Link>
          </nav>
        </div>
      </div>

      <div className="contact-content" style={{ padding: '50px 20px' }}>
        <div className="contact-layout" style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}>
          {/* Map Section */}
          <div className="map-section" style={{ height: '100%' }}>
            <div className="map-container" style={{ 
              width: '100%', 
              height: '100%',
              minHeight: '400px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <iframe 
                title="Google Map Location" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7127!3d9.0203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b860b3a4e6733%3A0x3ae74ad7c1cd9d1e!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1711117652523!5m2!1sen!2set" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="contact-info" style={{ 
            backgroundColor: '#f8f9fa',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ 
                fontSize: '2rem', 
                marginBottom: '20px', 
                color: '#333',
                textAlign: 'center'
              }}>
                Our Address
              </h4>
              <p style={{ 
                fontSize: '1.1rem', 
                marginBottom: '40px', 
                color: '#666',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                Completely synergize resource taxing relationships via niche markets. Professionally cultivate one-to-one customer service.
              </p>
            </div>
            
            <div className="contact-details" style={{ display: 'grid', gap: '25px', flex: 1 }}>
              <div className="contact-item" style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
              }}>
                <div className="icon" style={{ 
                  marginRight: '20px',
                  color: '#ee0c0a',
                  fontSize: '2rem'
                }}>
                  📍
                </div>
                <div className="details">
                  <h5 style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '8px', 
                    color: '#333',
                    fontWeight: '600'
                  }}>
                    Address:
                  </h5>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#666',
                    margin: 0
                  }}>
                    King George VI Street
                  </p>
                </div>
              </div>

              <div className="contact-item" style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
              }}>
                <div className="icon" style={{ 
                  marginRight: '20px',
                  color: '#ee0c0a',
                  fontSize: '2rem'
                }}>
                  ✉️
                </div>
                <div className="details">
                  <h5 style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '8px', 
                    color: '#333',
                    fontWeight: '600'
                  }}>
                    Email:
                  </h5>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#666',
                    margin: 0
                  }}>
                    contact@abegarage.com
                  </p>
                </div>
              </div>

              <div className="contact-item" style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
              }}>
                <div className="icon" style={{ 
                  marginRight: '20px',
                  color: '#ee0c0a',
                  fontSize: '2rem'
                }}>
                  📞
                </div>
                <div className="details">
                  <h5 style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '8px', 
                    color: '#333',
                    fontWeight: '600'
                  }}>
                    Phone:
                  </h5>
                  <p style={{ 
                    fontSize: '1rem', 
                    color: '#666',
                    margin: 0
                  }}>
                    1834 456 2223 | 1223 237 1234
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  )
}

export default Contact