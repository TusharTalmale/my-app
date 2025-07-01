// components/Contact.js
"use client";

import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SectionTitle from './SectionTitle';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiCode } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { FaPaperPlane } from 'react-icons/fa';
import { BsChatSquareQuote } from 'react-icons/bs';

const Contact = ({ id }) => {
  const { currentColors } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    { icon: <FiMail className="text-2xl" />, text: "tushartal2@gmail.com", link: "mailto:tushartal2@gmail.com" },
    { icon: <FiPhone className="text-2xl" />, text: "+91-8080009116", link: "tel:+918080009116" },
    { icon: <FiLinkedin className="text-2xl" />, text: "TusharTalmale", link: "https://linkedin.com/in/TusharTalmale" },
    { icon: <FiGithub className="text-2xl" />, text: "TusharTalmale", link: "https://github.com/TusharTalmale" },
    { icon: <SiLeetcode className="text-2xl" />, text: "LeetCode Profile", link: "https://leetcode.com/TusharTalmale" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id={id} className="py-20 relative overflow-hidden" style={{ backgroundColor: currentColors.backgroundAlt }}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10" 
           style={{ backgroundColor: currentColors.primary }}></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" 
           style={{ backgroundColor: currentColors.secondary }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <SectionTitle>
            <div className="flex items-center justify-center gap-2">
              <BsChatSquareQuote className="text-3xl" />
              <span>Get In Touch</span>
            </div>
          </SectionTitle>
          <p className="text-xl max-w-2xl mx-auto mt-4" style={{ color: currentColors.textSecondary }}>
            Have a project in mind or just want to say hi? My inbox is always open!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-6 p-4 rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ 
                  backgroundColor: currentColors.cardBg,
                  border: `1px solid ${currentColors.cardBorder}`
                }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl"
                     style={{ 
                       background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})`,
                       boxShadow: `0 4px 6px ${currentColors.primary}20`
                     }}>
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold" style={{ color: currentColors.text }}>
                    {info.icon.type === FiMail ? 'Email' : 
                     info.icon.type === FiPhone ? 'Phone' : 
                     info.icon.type === FiLinkedin ? 'LinkedIn' : 
                     info.icon.type === FiGithub ? 'GitHub' : 
                     'LeetCode'}
                  </h4>
                  <p className="text-md" style={{ color: currentColors.textSecondary }}>
                    {info.text}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20" 
                 style={{ backgroundColor: currentColors.primary }}></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full opacity-20" 
                 style={{ backgroundColor: currentColors.secondary }}></div>
                 
            <form 
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl shadow-xl relative z-10"
              style={{ 
                backgroundColor: currentColors.cardBg, 
                border: `1px solid ${currentColors.cardBorder}`,
                boxShadow: `0 10px 30px ${currentColors.primary}10`
              }}
            >
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg text-center"
                  style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg text-center"
                  style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}
                >
                  Oops! Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: currentColors.text }}>
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: currentColors.inputBg, 
                    color: currentColors.text, 
                    border: `1px solid ${currentColors.inputBorder}`,
                    '--tw-ring-color': currentColors.primary + '80'
                  }}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: currentColors.text }}>
                  Your Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: currentColors.inputBg, 
                    color: currentColors.text, 
                    border: `1px solid ${currentColors.inputBorder}`,
                    '--tw-ring-color': currentColors.primary + '80'
                  }}
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: currentColors.text }}>
                  Subject (Optional)
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: currentColors.inputBg, 
                    color: currentColors.text, 
                    border: `1px solid ${currentColors.inputBorder}`,
                    '--tw-ring-color': currentColors.primary + '80'
                  }}
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: currentColors.text }}>
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: currentColors.inputBg, 
                    color: currentColors.text, 
                    border: `1px solid ${currentColors.inputBorder}`,
                    '--tw-ring-color': currentColors.primary + '80'
                  }}
                  placeholder="Hello Tushar, I'd like to discuss..."
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})`,
                  color: 'white',
                  boxShadow: `0 4px 14px ${currentColors.primary}40`
                }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;