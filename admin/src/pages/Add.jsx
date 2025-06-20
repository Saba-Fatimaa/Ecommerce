import React from "react";
import { assets } from "../assets/admin_assets/assets";
const Add = () => {
  return (
    <form className="container mt-4">
      <div className="mb-3">
        <h5>Upload Images</h5>
        <div className="row g-2">
          {/* Image 1 */}
          <div className="col-6 col-md-3">
            <label
              htmlFor="image1"
              className="d-block border p-2 text-center rounded cursor-pointer"
            >
              <img
                src={assets.upload_area}
                alt="Upload 1"
                className="img-fluid"
              />
              <input type="file" id="image1" hidden />
            </label>
          </div>

          {/* Image 2 */}
          <div className="col-6 col-md-3">
            <label
              htmlFor="image2"
              className="d-block border p-2 text-center rounded cursor-pointer"
            >
              <img
                src={assets.upload_area}
                alt="Upload 2"
                className="img-fluid"
              />
              <input type="file" id="image2" hidden />
            </label>
          </div>

          {/* Image 3 */}
          <div className="col-6 col-md-3">
            <label
              htmlFor="image3"
              className="d-block border p-2 text-center rounded cursor-pointer"
            >
              <img
                src={assets.upload_area}
                alt="Upload 3"
                className="img-fluid"
              />
              <input type="file" id="image3" hidden />
            </label>
          </div>

          {/* Image 4 */}
          <div className="col-6 col-md-3">
            <label
              htmlFor="image4"
              className="d-block border p-2 text-center rounded cursor-pointer"
            >
              <img
                src={assets.upload_area}
                alt="Upload 4"
                className="img-fluid"
              />
              <input type="file" id="image4" hidden />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Add;
