import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-secondary">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-sm text-gray-500 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <div className="mb-8">
              <p className="mb-4">
                This Cookie Policy explains how Maharashtra Taekwondo Federation ("we," "our," or "us") uses cookies and similar technologies on our website. This policy is designed to help you understand what cookies are, how we use them, and your choices regarding their use.
              </p>
              <p>
                By continuing to use our website, you consent to the use of cookies as described in this policy.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">What Are Cookies?</h2>
            <p className="mb-6">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners. They help the website recognize your device and remember certain information about your visit, such as your preferences and actions on the site.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Types of Cookies We Use</h2>
            <p className="mb-4">We use the following types of cookies on our website:</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the website cannot function properly without them.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-1">Authentication cookies to identify you when you log into our website</li>
                <li className="mb-1">Security cookies to prevent fraud and protect the website</li>
                <li className="mb-1">Session cookies to remember information as you navigate through the site</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Preference Cookies</h3>
              <p className="mb-4">
                These cookies collect information about your choices and preferences, allowing us to remember language or other local settings and customize the website accordingly.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-1">Language preference cookies</li>
                <li className="mb-1">Location cookies to provide region-specific content</li>
                <li className="mb-1">Customization cookies to remember your settings and preferences</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Analytics Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the functionality of the website based on user behavior.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-1">Google Analytics cookies to track and analyze website traffic</li>
                <li className="mb-1">Performance cookies to understand how visitors navigate our website</li>
                <li className="mb-1">Statistics cookies to help us understand how users interact with our content</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Marketing Cookies</h3>
              <p className="mb-4">
                These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share information with other organizations or advertisers.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-1">Behavioral advertising cookies to provide you with relevant content based on your interests</li>
                <li className="mb-1">Social media cookies to allow you to share content on social media platforms</li>
                <li className="mb-1">Third-party advertising cookies from our marketing partners</li>
              </ul>
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Third-Party Cookies</h2>
            <p className="mb-6">
              We may allow third-party service providers to place cookies on our website to help us analyze how users use the site, deliver targeted advertising, or provide certain features. These third parties may collect information about your online activities over time and across different websites. We do not control these third-party cookies and recommend reviewing the privacy and cookie policies of these third parties to understand their practices.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">How Long Do Cookies Stay On Your Device?</h2>
            <p className="mb-6">
              The length of time a cookie will remain on your device depends on whether it is a "persistent" or "session" cookie. Session cookies will remain on your device until you stop browsing. Persistent cookies remain on your device until they expire or are deleted.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Cookie Management</h2>
            <p className="mb-4">
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. Generally, you can also manage similar technologies in the same way that you manage cookies using your browser's preferences.
            </p>
            <p className="mb-6">
              Please note that if you choose to block or delete cookies, you may not be able to take full advantage of our website's features. Certain essential cookies are required for the website to function properly, and disabling them may affect the functionality of the website.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-secondary">How to Manage Cookies in Major Browsers</h3>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-1"><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li className="mb-1"><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li className="mb-1"><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li className="mb-1"><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                <li className="mb-1"><strong>Internet Explorer:</strong> Tools → Internet Options → Privacy → Advanced</li>
              </ul>
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Changes to Our Cookie Policy</h2>
            <p className="mb-6">
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised policy on our website. We encourage you to periodically review this page to stay informed about our use of cookies.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-secondary">Contact Us</h2>
            <p className="mb-6">
              If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us at:
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
            
            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm">
                For more information about our privacy practices, please review our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Statement</Link>.
              </p>
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

export default CookiePolicy; 