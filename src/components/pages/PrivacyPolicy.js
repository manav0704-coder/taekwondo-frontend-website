import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-secondary">Privacy Statement</h1>
          
          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-sm text-gray-500 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <div className="mb-8">
              <p className="mb-4">
                Maharashtra Taekwondo Federation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Statement explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or enroll in our programs.
              </p>
              <p>
                Please read this Privacy Statement carefully. By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by the terms described in this policy.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Information We Collect</h2>
            <p className="mb-4">We may collect several types of information from and about users of our website, including:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Personal Identifiable Information:</strong> Name, email address, phone number, home address, date of birth, and emergency contact information when you create an account, register for classes, or fill out contact forms.</li>
              <li className="mb-2"><strong>Health Information:</strong> Medical history, physical limitations, or health conditions that are relevant to your participation in Taekwondo activities.</li>
              <li className="mb-2"><strong>Payment Information:</strong> Credit card details, bank account information, and billing address when you make payments for classes, events, or products.</li>
              <li className="mb-2"><strong>Attendance and Performance Records:</strong> Information about your attendance, belt ranks, skills progress, and participation in events or competitions.</li>
              <li className="mb-2"><strong>Media Content:</strong> Photographs and videos of you during classes, events, or competitions.</li>
              <li className="mb-2"><strong>Technical Information:</strong> IP address, browser type, device information, and cookies when you browse our website.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect about you for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Providing, maintaining, and improving our services</li>
              <li className="mb-2">Processing and managing class registrations, memberships, and payments</li>
              <li className="mb-2">Communicating with you about classes, events, schedule changes, and other important information</li>
              <li className="mb-2">Tracking student progress and managing rank advancements</li>
              <li className="mb-2">Sending promotional emails about new programs, special events, or other information we think may interest you</li>
              <li className="mb-2">Responding to your inquiries, comments, or concerns</li>
              <li className="mb-2">Analyzing usage patterns to improve our website and services</li>
              <li className="mb-2">Complying with legal obligations and protecting our rights</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Information Sharing and Disclosure</h2>
            <p className="mb-4">We may share your personal information in the following circumstances:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and hosting services.</li>
              <li className="mb-2"><strong>Taekwondo Organizations:</strong> We may share information with national or international Taekwondo federations for registration, certification, or competition purposes.</li>
              <li className="mb-2"><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              <li className="mb-2"><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.</li>
              <li className="mb-2"><strong>With Your Consent:</strong> We may share your information with third parties when you have given us consent to do so.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Your Rights and Choices</h2>
            <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Accessing, correcting, or updating your personal information</li>
              <li className="mb-2">Requesting deletion of your personal information</li>
              <li className="mb-2">Objecting to or restricting the processing of your personal information</li>
              <li className="mb-2">Withdrawing your consent at any time (where processing is based on consent)</li>
              <li className="mb-2">Requesting a copy of your personal information in a structured, commonly used, and machine-readable format</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Children's Privacy</h2>
            <p className="mb-6">
              We take children's privacy seriously. Our services are intended for individuals of all ages, including children under 13. When we collect personal information from children under 13, we do so in compliance with applicable laws, such as the Children's Online Privacy Protection Act (COPPA) in the United States. We obtain verifiable parental consent before collecting personal information from children under 13. Parents or guardians can review, update, or request the deletion of their child's personal information by contacting us.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Third-Party Links and Services</h2>
            <p className="mb-6">
              Our website may contain links to third-party websites, services, or content that are not owned or controlled by us. We are not responsible for the privacy practices of such third parties. We encourage you to review the privacy policies of any third-party websites you visit.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Changes to this Privacy Statement</h2>
            <p className="mb-6">
              We may update this Privacy Statement from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be effective as of the date stated at the top of this Privacy Statement. We encourage you to review this Privacy Statement periodically to stay informed about how we collect, use, and protect your information.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Contact Us</h2>
            <p className="mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Statement or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <p className="mb-1"><strong>Maharashtra Taekwondo Federation</strong></p>
              <p className="mb-1">Email: hibronpluse@gmail.com</p>
              <p className="mb-1">Phone: (+91) 8411917861</p>
              <p className="mb-1">Address: Mariyum High School and Jr.College, Gavhanevasti, Bhosari, Pimpri-Chinchwad, Maharashtra 411026</p>
              <p className="mb-1"><strong>Hours:</strong></p>
              <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="mb-1">Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link 
              to="/" 
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 