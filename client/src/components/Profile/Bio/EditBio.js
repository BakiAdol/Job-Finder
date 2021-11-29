import React, { useContext, useState } from "react";
import { MdAdd, MdClear, MdHouse, MdLanguage, MdSchool } from "react-icons/md";
import UserContext from "../../../context/UserContext";

export default function EditBio(props) {
  const { getUserDetails } = useContext(UserContext);

  // edu
  const [education, seteducation] = useState(props.userInfo.uEducations);
  const [newEdu, setnewEdu] = useState("");

  const eduInputHandle = (e) => {
    let { name, value } = e.target;
    const newArr = [...education];
    newArr[name] = value;
    seteducation(newArr);
  };

  const addNewEdu = () => {
    if (newEdu !== "") {
      seteducation([...education, newEdu]);
      setnewEdu("");
    }
  };

  const [address, setAddress] = useState(props.userInfo.uAddress);
  const [newAddr, setnewAddr] = useState("");

  const addInputHandle = (e) => {
    let { name, value } = e.target;
    const newArr = [...address];
    newArr[name] = value;
    setAddress(newArr);
  };

  const addNewAddr = () => {
    if (newAddr !== "") {
      setAddress([...address, newAddr]);
      setnewAddr("");
    }
  };

  // for link
  const [link, setLink] = useState(props.userInfo.uLinks);
  const [newLink, setnewLink] = useState({
    uLinkName: "",
    uLink: "",
  });

  const linkInputHandle = (e) => {
    const { id, name, value } = e.target;
    const newArr = [...link];
    if (name === "uLinkName") newArr[id].uLinkName = value;
    else newArr[id].uLink = value;
    setLink(newArr);
  };

  const addNewLink = () => {
    if (newLink.uLinkName !== "" && newLink.uLink !== "") {
      setLink([...link, newLink]);
      setnewLink({
        uLinkName: "",
        uLink: "",
      });
    }
  };

  return (
    <div className="bioContainer">
      <div className="profileBioTitle">Edit Bio</div>
      <div className="editEduCon">
        {education.map((item, pos) => {
          return (
            <div className="editBioRow" key={pos}>
              <div className="bioIconsBody">
                <MdSchool />
              </div>
              <input
                type="text"
                value={item}
                name={pos}
                onChange={eduInputHandle}
              />

              <button
                onClick={() => {
                  seteducation(education.filter((itm, p) => p !== pos));
                }}
              >
                <div className="bioIconsButton">
                  <MdClear />
                </div>
              </button>
            </div>
          );
        })}

        <div className="editBioRow editBioRowNew">
          <div className="bioIconsBody">
            <MdSchool />
          </div>
          <input
            type="text"
            placeholder="Enter Education"
            onChange={(e) => {
              setnewEdu(e.target.value);
            }}
            value={newEdu}
            name={"newEdu"}
          />
          <button onClick={addNewEdu}>
            <div className="bioIconsButton" style={{ color: "green" }}>
              <MdAdd />
            </div>
          </button>
        </div>
      </div>

      <div className="editAddrCon">
        {address.map((item, pos) => {
          return (
            <div className="editBioRow" key={pos}>
              <div className="bioIconsBody">
                <MdHouse />
              </div>
              <input
                type="text"
                value={item}
                name={pos}
                onChange={addInputHandle}
              />

              <button
                onClick={() => {
                  setAddress(address.filter((itm, p) => p !== pos));
                }}
              >
                <div className="bioIconsButton">
                  <MdClear />
                </div>
              </button>
            </div>
          );
        })}

        <div className="editBioRow">
          <div className="bioIconsBody">
            <MdHouse />
          </div>
          <input
            type="text"
            placeholder="Enter Addresss"
            onChange={(e) => {
              setnewAddr(e.target.value);
            }}
            value={newAddr}
            name={"newEdu"}
          />
          <button onClick={addNewAddr}>
            <div className="bioIconsButton" style={{ color: "green" }}>
              <MdAdd />
            </div>
          </button>
        </div>
      </div>

      <div className="editLinkCon">
        {link.map((item, pos) => {
          return (
            <div className="editBioRow" key={pos}>
              <div className="bioIconsBody">
                <MdLanguage />
              </div>
              <input
                type="text"
                id={pos}
                value={item.uLinkName}
                name="uLinkName"
                onChange={linkInputHandle}
                style={{ width: "40%" }}
              />
              <input
                type="text"
                id={pos}
                value={item.uLink}
                name="uLink"
                onChange={linkInputHandle}
                style={{ width: "40%" }}
              />

              <button
                onClick={() => {
                  setLink(link.filter((itm, p) => p !== pos));
                }}
              >
                <div className="bioIconsButton">
                  <MdClear />
                </div>
              </button>
            </div>
          );
        })}

        <div className="editBioRow">
          <div className="bioIconsBody">
            <MdLanguage />
          </div>
          <input
            type="text"
            placeholder="Enter Link Name"
            value={newLink.uLinkName}
            name="uLinkName"
            style={{ width: "40%" }}
            onChange={(e) => {
              setnewLink({ ...newLink, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="www."
            style={{ width: "40%" }}
            onChange={(e) => {
              setnewLink({ ...newLink, [e.target.name]: e.target.value });
            }}
            value={newLink.uLink}
            name="uLink"
          />
          <button onClick={addNewLink}>
            <div className="bioIconsButton" style={{ color: "green" }}>
              <MdAdd />
            </div>
          </button>
        </div>
      </div>

      <div className="bioSaveExit">
        <button
          onClick={async () => {
            const userEdu = education;
            const userAddr = address;
            const userLink = link;
            const userId = props.userInfo._id;

            await fetch("/profileupdate/bio", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                userEdu,
                userAddr,
                userLink,
              }),
            });
            await getUserDetails(userId);
            props.setEditBio(false);
          }}
        >
          Update Bio
        </button>

        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            props.setEditBio(false);
          }}
        >
          Cancle
        </button>
      </div>
    </div>
  );
}
