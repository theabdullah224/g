import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Copyright from "./Copyright";
// import Header from './Header'

function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <div className="container px-9 py-4">
        <h1 className="text-4xl 2xl:text-5xl text-Text1 font-bold mt-12">
        Privacy Policy for gbmeals
        </h1>

        <h2 className="text-2xl text-Text1 font-semibold mt-8">Introduction</h2>
        <p className="text-lg text-Text2 mt-2"> 
          This Privacy Policy outlines how gbmeals collects, uses, protects, and
          shares the personal information of our users. Your privacy is
          essential to us, and we are committed to protecting your personal data
          in accordance with this policy and applicable laws.
        </p>

        <h2 className="text-2xl text-Text1 font-semibold mt-8">Information Collection</h2>
        <p className="text-lg text-Text2 mt-2"> <b>
          Personal Information:</b> We collect personal information you provide when
          you register for an account, subscribe to our services, or interact
          with our customer support. This may include your name, email address,
          dietary preferences, health information, and payment details.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Usage Data:</b> We collect information on how you access and use our
          services, including information such as your IP address, browser type,
          browser version, our service pages that you visit, the time and date
          of your visit, the time spent on those pages, and other diagnostic
          data.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Cookies and Tracking Data:</b> We use cookies and similar tracking
          technologies to track activity on our services and hold certain
          information.
        </p>

        <h2 className="text-2xl text-Text1 font-semibold mt-8">Use of Data</h2>
        <p className="text-lg text-Text2 mt-2"> <b>
          Service Provision:</b> To provide and maintain our service, including
          monitoring the usage of our service.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Personalization:</b> To personalize your experience and to deliver content
          and product offerings relevant to your interests, including targeted
          offers and ads through our website.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Communication:</b> To contact you with newsletters, marketing or
          promotional materials, and other information that may be of interest
          to you.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Customer Support:</b> To provide customer care and support.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Safety and Security:</b> To ensure the personal safety of users of the
          service and the public, as well as to protect against legal liability.
        </p>

        <h2 className="text-2xl text-Text1 font-semibold mt-8">
          Data Sharing and Disclosure
        </h2>
        <p className="text-lg text-Text2 mt-2"> <b>
          Service Providers:</b> We may employ third-party companies and individuals
          to facilitate our service ("Service Providers"), provide the service
          on our behalf, perform service-related services, or assist us in
          analyzing how our service is used.
        </p>
        <p className="text-lg text-Text2 mt-2"> <b>
          Legal Requirements:</b> gbmeals may disclose your Personal Data in the
          belief that such action is necessary to:
        </p>
        <ul className="list-disc list-inside text-lg text-Text2 mt-2">
          <li>Comply with a legal obligation</li>
          <li>Protect and defend the rights or property of gbmeals</li>
          <li>
            Prevent or investigate possible wrongdoing in connection with the
            service
          </li>
        </ul>
      </div>
      <Copyright />
    </div>
  );
}

export default PrivacyPolicy;
