import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-secondary">Terms and Conditions</h1>
          
          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-sm text-gray-500 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <div className="mb-8">
              <p className="mb-4">
                Welcome to the Maharashtra Taekwondo Federation website ("Website"). By accessing or using our Website, registering for classes, participating in events, or using any of our services, you agree to be bound by these Terms and Conditions ("Terms"). Please read these Terms carefully before using our services.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must not use our Website or services.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. These Terms constitute a legally binding agreement between you and Maharashtra Taekwondo Federation ("we," "our," or "us"). We reserve the right to modify these Terms at any time without prior notice. Your continued use of the Website after any changes constitutes your acceptance of the revised Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">2. Eligibility</h2>
            <p className="mb-6">
              Our Website and services are available to users of all ages. However, if you are under 18 years of age, you must have permission from a parent or legal guardian before using our Website, creating an account, or enrolling in our programs. By using our Website or services, you represent and warrant that you have obtained such permission if you are under 18 years of age.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">3. Account Registration</h2>
            <p className="mb-4">
              To access certain features of our Website, you may need to create an account. When you create an account, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Provide accurate, current, and complete information</li>
              <li className="mb-2">Maintain and promptly update your account information</li>
              <li className="mb-2">Keep your password secure and confidential</li>
              <li className="mb-2">Be responsible for all activities that occur under your account</li>
              <li className="mb-2">Notify us immediately of any unauthorized use of your account or any other breach of security</li>
            </ul>
            <p className="mb-6">
              We reserve the right to suspend or terminate your account if you provide inaccurate, untrue, or incomplete information, or if we have reasonable grounds to suspect that such information is inaccurate, untrue, or incomplete.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">4. Class Enrollment and Participation</h2>
            <p className="mb-4">
              By enrolling in our Taekwondo classes or programs, you acknowledge and agree to the following:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Physical Requirements:</strong> Taekwondo is a physical activity that requires a certain level of fitness and health. You should consult with a healthcare professional before beginning any physical activity program.</li>
              <li className="mb-2"><strong>Assumption of Risk:</strong> Participation in Taekwondo activities involves risks of physical injury. You voluntarily assume all such risks, both known and unknown.</li>
              <li className="mb-2"><strong>Medical Disclosure:</strong> You must disclose any medical conditions, allergies, or physical limitations that may affect your ability to participate safely in our programs.</li>
              <li className="mb-2"><strong>Compliance with Rules:</strong> You agree to follow all rules, regulations, and instructions provided by our instructors and staff.</li>
              <li className="mb-2"><strong>Proper Conduct:</strong> You agree to conduct yourself in a respectful and appropriate manner during all classes, events, and interactions with instructors, staff, and other participants.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">5. Payment and Refund Policy</h2>
            <p className="mb-4">
              By enrolling in our classes or purchasing our services, you agree to the following payment terms:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2"><strong>Fees:</strong> All fees are payable in advance according to the payment schedule specified at the time of enrollment.</li>
              <li className="mb-2"><strong>Payment Methods:</strong> We accept various payment methods as indicated on our Website.</li>
              <li className="mb-2"><strong>Recurring Payments:</strong> If you enroll in a program with recurring payments, you authorize us to charge your payment method on a regular basis until you cancel your enrollment.</li>
              <li className="mb-2"><strong>Refunds:</strong> Refund requests must be submitted in writing. Refund eligibility is determined by the specific program's refund policy, which will be provided at the time of enrollment.</li>
              <li className="mb-2"><strong>Cancellation:</strong> Cancellation policies vary by program and will be specified at the time of enrollment.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">6. Intellectual Property</h2>
            <p className="mb-6">
              All content on our Website, including but not limited to text, graphics, logos, images, videos, and software, is the property of Maharashtra Taekwondo Federation or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, display, or use any content from our Website without our prior written permission.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">7. User Content</h2>
            <p className="mb-4">
              You may have the opportunity to submit content to our Website, such as comments, reviews, or media. By submitting content, you:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Represent that you own or have the necessary rights to submit such content</li>
              <li className="mb-2">Grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media</li>
              <li className="mb-2">Agree not to submit content that is unlawful, defamatory, abusive, obscene, or otherwise objectionable</li>
            </ul>
            <p className="mb-6">
              We reserve the right to remove any content that violates these Terms or that we deem inappropriate for any reason.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">8. Media Consent</h2>
            <p className="mb-6">
              By participating in our classes, events, or competitions, you grant us permission to take photographs and videos that may include your image and to use such media for promotional, educational, or commercial purposes in any media format, including but not limited to our Website, social media, brochures, and advertisements. If you (or your parent/guardian for minors) do not consent to the use of your image, you must notify us in writing.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">9. Limitation of Liability</h2>
            <p className="mb-6">
              To the fullest extent permitted by applicable law, Maharashtra Taekwondo Federation and its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of our Website or services, whether based on contract, tort, negligence, strict liability, or otherwise, even if we have been advised of the possibility of such damages.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">10. Indemnification</h2>
            <p className="mb-6">
              You agree to indemnify, defend, and hold harmless Maharashtra Taekwondo Federation and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to your violation of these Terms or your use of our Website or services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">11. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of Maharashtra, India, without regard to its conflict of law principles. Any legal action or proceeding arising out of or relating to these Terms or your use of our Website or services shall be brought exclusively in the courts located in Maharashtra, India, and you consent to the personal jurisdiction of such courts.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">12. Severability</h2>
            <p className="mb-6">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the validity, legality, or enforceability of the remaining provisions shall not in any way be affected or impaired.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">13. Contact Information</h2>
            <p className="mb-6">
              If you have any questions, concerns, or comments about these Terms, please contact us at:
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

export default TermsAndConditions; 