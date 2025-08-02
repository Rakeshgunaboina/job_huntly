import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './Contact.scss';

const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name too short'),
  email: yup.string().required('Email is required').email('Invalid email'),
  message: yup.string().required('Message is required').min(10, 'Message too short'),
  subject: yup.string().required('Subject is required'),
  contactMethod: yup.string().required('Please select a contact method')
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [contactMethods] = useState([
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/job_huntly/contact', data);

      if (response.data.success) {
        setSubmitStatus({ success: true, message: 'Message sent successfully!' });
        reset();
      } else {
        setSubmitStatus({ success: false, message: response.data.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || 'An error occurred. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus?.success) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? We'd love to hear from you.</p>

          <div className="contact-methods">
            <div className="contact-method">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>support@jobhuntly.com</p>
              <p>Response time: 24 hours</p>
            </div>
            <div className="contact-method">
              <i className="fas fa-phone"></i>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9am-5pm GMT</p>
            </div>
            <div className="contact-method">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Visit Us</h3>
              <p>123 Tech Street</p>
              <p>London, UK</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>

          {submitStatus && (
            <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-row">
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label htmlFor="name">Full Name</label>
                <input id="name" type="text" {...register('name')} placeholder="Enter your full name" />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" {...register('email')} placeholder="Enter your email" />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
            </div>

            <div className={`form-group ${errors.subject ? 'error' : ''}`}>
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" {...register('subject')} placeholder="What's this about?" />
              {errors.subject && <span className="error-message">{errors.subject.message}</span>}
            </div>

            <div className={`form-group ${errors.contactMethod ? 'error' : ''}`}>
              <label>Preferred Contact Method</label>
              <div className="radio-group">
                {contactMethods.map(method => (
                  <label key={method.value} className="radio-option">
                    <input type="radio" value={method.value} {...register('contactMethod')} />
                    <span className="radio-custom"></span>
                    {method.label}
                  </label>
                ))}
              </div>
              {errors.contactMethod && <span className="error-message">{errors.contactMethod.message}</span>}
            </div>

            <div className={`form-group ${errors.message ? 'error' : ''}`}>
              <label htmlFor="message">Your Message</label>
              <textarea id="message" {...register('message')} placeholder="How can we help you?" rows="5" />
              {errors.message && <span className="error-message">{errors.message.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.68038048753!2d-0.1277586842302183!3d51.50073217963436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0xb78f2474b9a45aa9!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
