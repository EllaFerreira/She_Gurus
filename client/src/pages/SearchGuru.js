import React from "react";
import Placeholder from "../assets/placeholder.png";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ONE_GURU_BY_ID } from "../utils/queries";
import ContentLoader from "../components/Loader/index";

export default function Profile() {
  const { guruId } = useParams();

  const { loading, data } = useQuery(ONE_GURU_BY_ID, {
    variables: { guruId: guruId },
  });

  const guru = data?.oneguru || {};

  console.log(guru.surname);

  const getToken = localStorage.getItem("id_token");

  const getUserType = () => {
    console.log(getToken);
    if (getToken !== null) {
      console.log(Auth.getProfile().data.user_type);
      return Auth.getProfile().data.user_type;
    }
    console.log("No token found, please try again!");
  };

  if (loading) {
    return <ContentLoader />;
  }
  return (
    <div className="tutorProfile-main">
      <div className="profile-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="tutorProfile-header">Tutor Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <img
              src={guru.photo ? `${guru.photo}` : Placeholder}
              className="profile-img-tutor-result"
              alt="test"
            ></img>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="row">
              <div className="col">
                <h1>{guru.surname}</h1>
              </div>
            </div>
            <br />
            <div className="row contact-profile">
              <div className="col-8 contact-profile-box">
                <h2 className="contact-header">
                  Email: <span className="contact-span">{guru.email}</span>
                </h2>
              </div>
            </div>
            <br />
            <div className="row ">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 small-box">
                <h2 className="profile-box-header-result">Skills</h2>
                <p className="p-box">{guru.skills}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
            <img src={guru.photo} alt="ProfilePicture" />

            {getUserType() === "Student" ? (
              <Link className="btn btn-ld btn-warning" to={`/book/${guru._id}`}>
                <i className="fas fa-shopping-cart"></i> Contact guru
              </Link>
            ) : (
              <p className="login-p-error">
                Login as a student to book a session!
              </p>
            )}
          </div>
        </div>
        <div className="row about-me">
          <div className="col">
            <h2>About {guru.surname}:</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
