import React, { useState } from "react";

export default function ExperienceCard({ experience }) {
  const [show, setShow] = useState(false);
  return (
    <div className="profileCard">
      <button onClick={() => setShow(!show)} className="profileCardTItle">
        {experience.eName}
      </button>
      {show ? (
        <div className="profileCardDescription">{experience.eDetails}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
