import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="container py-5 border-top">
      {/* Title */}
      <div className="text-center mb-4">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Content Row */}
      <div className="row align-items-center gy-4 mb-5">
        {/* Image */}
        <div className="col-12 col-md-6">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="img-fluid w-100"
          />
        </div>

        {/* Contact Details */}
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column gap-3 text-secondary">
            <h5 className="text-dark fw-semibold">Our Store</h5>
            <p>
              54709 Willms Station<br />
              Suite 350, Washington, USA
            </p>
            <p>
              Tel: (415) 555-0132<br />
              Email: <a href="mailto:admin@forever.com">admin@forever.com</a>
            </p>
            <h5 className="text-dark fw-semibold">Careers at Forever</h5>
            <p>
              We’re always looking for talented individuals to join our team.
              Reach out to us at careers@forever.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
