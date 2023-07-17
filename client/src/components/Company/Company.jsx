import React from "react";
import "./Company.scss";
import { NavLink } from "react-router-dom";
import companyData from "./companyData";

const Company = () => {
  return (
    <>
      <div className="company">
        <div className="company-heading">
          <span>Explore poupolar brands</span>
        </div>
        <div className="company-cards">
          {companyData.length > 0
            ? companyData.map((product) => {
                return (
                  <>
                    <NavLink to="/Products">
                      <div className="company-card" key={product.id}>
                        <div className="image">
                          <img
                            src={product.image}
                            alt="company"
                            loading="lazy"
                          />
                        </div>

                        <div className="name">
                          <span>{product.name}</span>
                        </div>
                      </div>
                    </NavLink>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Company;
