import React from "react";
import { IconContext } from "react-icons";
import { MdHouse, MdLanguage, MdSchool } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Bio() {
  const hyperLinks = [
    {
      linkName: "Facebook",
      link: "www.facebook.com",
    },
    {
      linkName: "Google",
      link: "www.google.com",
    },
    {
      linkName: "Codeforces",
      link: "www.codeforces.com",
    },
  ];
  const addresses = ["Lives in Dhaka, Bangladesh", "Lives in Canada", "London"];
  const educations = [
    "Studies B. Sc in Computer Science & Engineering (CSE) at Daffodil International University",
    "Studies B. Sc in Computer Science & Engineering (CSE) at Daffodil International University",
  ];
  return (
    <IconContext.Provider value={{ className: "bioIcons" }}>
      <div className="bioContainer">
        {educations.map((item, pos) => {
          return (
            <div className="bioRowsBlock" key={pos}>
              <div className="bioIconsBody">
                <MdSchool />
              </div>
              <p>{item}</p>
            </div>
          );
        })}
        {addresses.map((item, pos) => {
          return (
            <div className="bioRowsBlock" key={pos}>
              <div className="bioIconsBody">
                <MdHouse />
              </div>
              <p>{item}</p>
            </div>
          );
        })}

        {hyperLinks.map((item, pos) => {
          return (
            <div className="bioRowsBlock bioRowsBlockLInks" key={pos}>
              <div className="bioIconsBody">
                <MdLanguage />
              </div>
              <p>
                <Link
                  to={{
                    pathname: "http://" + item.link,
                  }}
                  target="_blank"
                  className="bioRowsBlockLInks"
                >
                  {item.linkName}
                </Link>
              </p>
            </div>
          );
        })}

        <div className="cvContainer">CV</div>
      </div>
    </IconContext.Provider>
  );
}
