import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-container">
          <div className="first">
            <div className="top">
              <div className="card">
                <button className="btn-cat">men</button>
                <img
                  src="https://www.dropbox.com/s/ap64yxpzcma39u4/men1.jpg?raw=1"
                  alt="hero"
                  className="first"
                  loading="lazy"
                />
                <img
                  src="https://www.dropbox.com/s/dh0m46morykop06/men2.jpg?raw=1"
                  alt="hero"
                  className="second"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="middle">
              <div className="card">
                <button className="btn-cat">women</button>
                <img
                  src="https://www.dropbox.com/s/h2rf70mtd9ojs32/women2.jpg?raw=1"
                  alt="hero"
                  className="first"
                  loading="lazy"
                />
                <img
                  src="https://www.dropbox.com/s/kfw99s7sfzhoxdo/women1.jpg?raw=1"
                  alt="hero"
                  className="second"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="bottom">
              <div className="card">
                <button className="btn-cat">kids</button>
                <img
                  src="https://www.dropbox.com/s/8ncugp2rx82yf2d/kids2.jpg?raw=1"
                  alt="hero"
                  className="first"
                  loading="lazy"
                />
                <img
                  src="https://www.dropbox.com/s/p2a8va9g1ivyqdq/kids1.jpg?raw=1"
                  alt="hero"
                  className="second"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="second">
            <div className="top">
              <div className="card">
                <button className="btn-cat">mobile</button>
                <img
                  src="https://www.dropbox.com/s/qx2kn3t77iysr23/mobile2.jpg?raw=1"
                  alt="hero"
                  className="first"
                  loading="lazy"
                />
                <img
                  src="https://www.dropbox.com/s/y3ohwv597cnm5gi/mobile1.jpg?raw=1"
                  alt="hero"
                  className="second"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                <div className="card">
                  <button className="btn-cat">laptop</button>
                  <img
                    src="https://www.dropbox.com/s/hgydxd3r894ini6/laptop1.webp?raw=1"
                    alt="hero"
                    className="first"
                    loading="lazy"
                  />
                  <img
                    src="https://www.dropbox.com/s/8zi304gm5nap20z/laptop2.jpg?raw=1"
                    alt="hero"
                    className="second"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="right">
                <div className="card">
                  <button className="btn-cat">camera</button>
                  <img
                    src="https://www.dropbox.com/s/3twoyl0hipwau6c/camera1.webp?raw=1"
                    alt="hero"
                    className="first"
                    loading="lazy"
                  />
                  <img
                    src="https://www.dropbox.com/s/ajs896nza5ioi3a/camera2.jpg?raw=1"
                    alt="hero"
                    className="second"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="third">
            <div className="top">
              <div className="card">
                <button className="btn-cat">shoes</button>
                <img
                  src="https://www.dropbox.com/s/g49vpoaooj8t2rw/shoes1.webp?raw=1"
                  alt="hero"
                  className="first"
                  loading="lazy"
                />
                <img
                  src="https://www.dropbox.com/s/wc6i27rhhyxct5c/shoes2.jpg?raw=1"
                  alt="hero"
                  className="second"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="bottom">
              <div className="card">
                <button className="btn-cat">beauty</button>
                <img
                  src="https://www.dropbox.com/s/opdz59xcqdjnfj6/beauty2.jpg?raw=1"
                  alt="hero"
                  className="first"
                  loading="lazy"
                />
                <img
                  src="https://www.dropbox.com/s/93e02q05t8q76sg/beauty1.jpg?raw=1"
                  alt="hero"
                  className="second"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
