import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="pt-5 border-top">
      {/* Title Section */}
      <div className="text-center mb-4">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* Content Section */}
      <div className="container my-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6">
            <img
              src={assets.about_img}
              alt="About Us"
              className="img-fluid w-100"
            />
          </div>
          <div className="col-12 col-md-6 text-secondary">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <h5 className="text-dark mt-3">Our Mission</h5>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations. from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center mb-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Features Grid */}
      <div className="row g-4 text-secondary">
        <div className="col-12 col-md-4">
          <div className="border p-4 h-100">
            <h6 className="text-dark">Quality Assurance</h6>
            <p className="mb-0">
              We meticulously select and vet each product to ensure it meets the
              highest standards of quality and reliability.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="border p-4 h-100">
            <h6 className="text-dark">Convenience</h6>
            <p className="mb-0">
              With our user-friendly interface and hassle-free checkout,
              shopping has never been easier.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="border p-4 h-100">
            <h6 className="text-dark">Exceptional Customer Service</h6>
            <p className="mb-0">
              Our team of dedicated professionals is here to assist you at every
              step of your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
