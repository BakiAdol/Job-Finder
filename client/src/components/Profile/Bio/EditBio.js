import React, { useState } from "react";
import { MdAdd, MdClear, MdHouse, MdLanguage, MdSchool } from "react-icons/md";

export default function EditBio(props) {
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
      <div className="editEduCon">
        {education.map((item, pos) => {
          return (
            <div key={pos}>
              <MdSchool />
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
                <MdClear />
              </button>
            </div>
          );
        })}

        <div>
          <MdSchool />
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
            <MdAdd />
          </button>
        </div>
      </div>

      <div className="editAddrCon">
        {address.map((item, pos) => {
          return (
            <div key={pos}>
              <MdHouse />
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
                <MdClear />
              </button>
            </div>
          );
        })}

        <div>
          <MdHouse />
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
            <MdAdd />
          </button>
        </div>
      </div>

      <div className="linkEditDiv">
        {link.map((item, pos) => {
          return (
            <div key={pos}>
              <MdLanguage />
              <input
                type="text"
                id={pos}
                value={item.uLinkName}
                name="uLinkName"
                onChange={linkInputHandle}
              />
              <input
                type="text"
                id={pos}
                value={item.uLink}
                name="uLink"
                onChange={linkInputHandle}
              />

              <button
                onClick={() => {
                  setLink(link.filter((itm, p) => p !== pos));
                }}
              >
                <MdClear />
              </button>
            </div>
          );
        })}

        <div>
          <MdLanguage />
          <input
            type="text"
            placeholder="Enter Link Name"
            value={newLink.uLinkName}
            name="uLinkName"
            onChange={(e) => {
              setnewLink({ ...newLink, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Enter url"
            onChange={(e) => {
              setnewLink({ ...newLink, [e.target.name]: e.target.value });
            }}
            value={newLink.uLink}
            name="uLink"
          />
          <button onClick={addNewLink}>
            <MdAdd />
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            props.userInfo.uEducations = education;
            console.log(props.userInfo);
            props.setEditBio(false);
          }}
        >
          Update Bio
        </button>
      </div>
      <div>
        <button
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
