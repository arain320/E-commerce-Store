import React from "react";
import "./Footer.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <div className="footer">
        <div className="top">
          <div className="main-category common">
            <div className="heading">
              <span>categories</span>
            </div>
            <div className="links">
              <div className="left row">
                <li>
                  <NavLink to="/products">men</NavLink>
                </li>
                <li>
                  <NavLink to="/products">women</NavLink>
                </li>
                <li>
                  <NavLink to="/products">kidstoyz</NavLink>
                </li>
                <li>
                  <NavLink to="/products">facewash</NavLink>
                </li>
                <li>
                  <NavLink to="/products">beautycream</NavLink>
                </li>
                <li>
                  <NavLink to="/products">hairproduct</NavLink>
                </li>
                <li>
                  <NavLink to="/products">jackets</NavLink>
                </li>
                <li>
                  <NavLink to="/products">shoes</NavLink>
                </li>
              </div>
              <div className="right row">
                <li>
                  <NavLink to="/products">mobile</NavLink>
                </li>
                <li>
                  <NavLink to="/products">laptop</NavLink>
                </li>
                <li>
                  <NavLink to="/products">camera</NavLink>
                </li>
                <li>
                  <NavLink to="/products">smartTV</NavLink>
                </li>
                <li>
                  <NavLink to="/products">fastcharger</NavLink>
                </li>
                <li>
                  <NavLink to="/products">handsfree</NavLink>
                </li>
                <li>
                  <NavLink to="/products">airpods</NavLink>
                </li>
                <li>
                  <NavLink to="/products">watch</NavLink>
                </li>
              </div>
            </div>
          </div>
          <div className="social-links">
            <div className="wrapper">
              <div className="toggle">
                <i className="fa-solid fa-share-nodes"></i>
              </div>
              <div className="facebook">
                <li>
                  <a href="https://www.facebook.com">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
              </div>
              <div className="whatsapp">
                <li>
                  <a href="https://www.whatsapp.com">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </li>
              </div>
              <div className="twitter">
                <li>
                  <a href="https://www.twitter.com">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
              </div>
              <div className="dribbble">
                <li>
                  <a href="https://www.dribbble.com">
                    <i className="fa-brands fa-dribbble"></i>
                  </a>
                </li>
              </div>
              <div className="linkedin">
                <li>
                  <a href="https://www.linkedin.com">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
              </div>
              <div className="instagram">
                <li>
                  <a href="https://www.instagram.com">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </div>
              <div className="pinterest">
                <li>
                  <a href="https://www.pinterest.com">
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </li>
              </div>
              <div className="youtube">
                <li>
                  <a href="https://www.youtube.com">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div className="main-brands common">
            <div className="heading">
              <span>brands</span>
            </div>
            <div className="links">
              <div className="left  row">
                <li>
                  <NavLink to="/products">apple</NavLink>
                </li>
                <li>
                  <NavLink to="/products">huawei</NavLink>
                </li>
                <li>
                  <NavLink to="/products">samsung</NavLink>
                </li>
                <li>
                  <NavLink to="/products">canon</NavLink>
                </li>
                <li>
                  <NavLink to="/products">nike</NavLink>
                </li>
              </div>
              <div className="right row">
                <li>
                  <NavLink to="/products">nikon</NavLink>
                </li>
                <li>
                  <NavLink to="/products">adidas</NavLink>
                </li>
                <li>
                  <NavLink to="/products">xiaomi</NavLink>
                </li>
                <li>
                  <NavLink to="/products">puma</NavLink>
                </li>
                <li>
                  <NavLink to="/products">haier</NavLink>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>
            copyright <i class="fa-regular fa-copyright"></i> {date},{" "}
            <i class="fa-solid fa-at"></i> Hasnain,Pir mahal,All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
