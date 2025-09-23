import React, { useState, createRef } from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";

export default function ExperienceCard({ cardInfo, isDark }) {
  const [colorArrays, setColorArrays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const imgRef = createRef();

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return typeof values === "undefined"
      ? null
      : "rgb(" + values.join(", ") + ")";
  }

  const GetDescBullets = ({ descBullets, isDark }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {item}
          </li>
        ))
      : null;
  };

  return (
    <>
      <div
        className={isDark ? "experience-card-dark" : "experience-card"}
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
        style={{ cursor: "pointer" }}
        tabIndex={0}
      >
        <div style={{ background: rgb(colorArrays) }} className="experience-banner">
          <div className="experience-blurred_div"></div>
          <div className="experience-div-company">
            <h5 className="experience-text-company">{cardInfo.company}</h5>
          </div>
          <a href={cardInfo.companylink} target="_blank" rel="noreferrer" className="experience-company-link" onClick={e => e.stopPropagation()}>
            <img
              crossOrigin={"anonymous"}
              ref={imgRef}
              className="experience-roundedimg"
              src={cardInfo.companylogo}
              alt={cardInfo.company}
              onLoad={() => getColorArrays()}
            />
          </a>
        </div>
        <div className="experience-text-details">
          <h5 className={isDark ? "experience-text-role dark-mode-text" : "experience-text-role"}>
            {cardInfo.role}
          </h5>
          <h5 className={isDark ? "experience-text-date dark-mode-text" : "experience-text-date"}>
            {cardInfo.date}
          </h5>
        </div>
        {showModal && (
  <div className="experience-modal-pop" 
       onMouseEnter={() => setShowModal(true)} 
       onMouseLeave={() => setShowModal(false)}
       onClick={() => window.open(cardInfo.companylink, "_blank")}
       style={{ cursor: "pointer" }}
  >
    <div className="experience-modal-content">
      {/* <h3 className={isDark ? "experience-text-role dark-mode-text" : "experience-text-role"}>
        {cardInfo.role}
      </h3>
      <h4 className={isDark ? "experience-text-company dark-mode-text" : "experience-text-company"}>
        {cardInfo.company}
      </h4>
      <h5 className={isDark ? "experience-text-date dark-mode-text" : "experience-text-date"}>
        {cardInfo.date}
      </h5>
      <p className={isDark ? "subTitle experience-text-desc dark-mode-text" : "subTitle experience-text-desc"}>
        {cardInfo.desc}
      </p> */}
      <ul>
        <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
      </ul>
    </div>
  </div>
)}
      </div>
    </>
  );
}