import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import "./StudentEditForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const initialState = {
  fname: "",
  lname: "",
  location: "",
  email: "",
  education: "",
  dob: "",
  about: "",
};

const StudentEditForm = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  

  const [state, setState] = useState(initialState);

  const { fname, lname, location, email, education, dob, about } = state;

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    

    if (
      !fname ||
      !lname ||
      !location ||
      !email ||
      !dob ||
      !education ||
      !about
    ) {
      alert("Please provide  all value");
    } else {
      if (!id) {
        axios
          .post("http://localhost:3000/api/post", {
            fname,
            lname,
            location,
            email,
            dob,
            education,
            about,
          })
          .then(() => {
            setState({
              fname: "",
              location: "",
              email: "",
              lname: "",
              dob: "",
              education: "",
              about: "",
            });
          })
          .catch((err) => console.error(err));
          setTimeout(() =>navigate("/"),500); 
      } else {
        axios
          .put(`http://localhost:3000/api/update/${id}`, {
            fname,
            lname,
            location,
            email,
            dob,
            education,
            about,
          })
          .then(() => {
            setState({
              fname: "",
              location: "",
              email: "",
              lname: "",
              dob: "",
              education: "",
              about: "",
            });
          })
          .catch((err) => console.error(err));
      }
      setTimeout(() =>navigate("/"),500); 
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <button type="button" className="btnArrow" onClick={handleBack}>
        <FiArrowLeft />
      </button>
      <div className="container">
        <p className="title">Add student Details</p>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-lg-6 col-xl-6 column1 studentCol">
                <div className="editInput">
                  <label htmlFor="fname" className="labelInput">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control input inputSpace"
                    placeholder="Enter your first name"
                    name="fname"
                    id="fname"
                    value={fname || ""}
                    onChange={handleInput}
                  />
                </div>
                <div className="editInput">
                  <label htmlFor="email" className="labelInput">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control input inputSpace"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    value={email || ""}
                    onChange={handleInput}
                  />
                </div>
                <div className="editInput">
                  <label htmlFor="education" className="labelInput">
                    Education
                  </label>
                  <input
                    type="text"
                    className="form-control input inputSpace"
                    placeholder="Enter your education"
                    name="education"
                    id="education"
                    value={education || ""}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className=" col-sm-12 col-lg-6 col-xl-6 column2 studentCol ">
                <div className="editInput mobileEditInput">
                  <label htmlFor="lname" className="labelInput">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control input inputSpace"
                    placeholder="enter last name"
                    name="lname"
                    id="lname"
                    value={lname || ""}
                    onChange={handleInput}
                  />
                </div>

                
                 

                 <div className="editInput">
                  <label htmlFor="dob" className="labelInput">DOB:</label>
                 <input
                  type="date"
                
                  className="form-control input inputSpace"
                  placeholder=""
                  name="dob"
                  id="dob"
                  value={dob || ""}
                  onChange={handleInput}

                />                                
                </div>  




                <div className="editInput">
                  <label htmlFor="location" className="labelInput">
                    location
                  </label>
                  <input
                    type="text"
                    className="form-control input inputSpace"
                    placeholder="enter your location"
                    name="location"
                    id="location"
                    value={location || ""}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-12 col-xl-12  studentCol">
                <div className="row">
                  <div className="col-lg-2 col-md-6 col-sm-12">
                    <label htmlFor="about" className="labelInput aboutLabel">About</label>
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12">
                    <textarea
                      className="form-control inputSpace textAreaWidth"
                      rows={5}
                      placeholder="Enter your details"
                      id="about"
                      name="about"
                      value={about || ""}
                      onChange={handleInput}
                    ></textarea>
                    <div>  <input
                type="submit"
                className=" btnSubmit"
                value={id ? "update" : "Submit"}
              /></div>
                   
                  </div>
                </div>
              </div>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentEditForm;
