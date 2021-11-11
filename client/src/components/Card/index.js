import React from "react";
import { Link } from "react-router-dom";
import PlaceHolderImg from "../../../public/img/placeholder.png";
import EmptyState from "../../components/EmptyState/index";
import GuruProfileDetails from "../GuruProfileDeatils/index";

export default function Card({ gurus, skills }) {
  function cardDescription(skills) {
    if (!gurus.length) {
      return <EmptyState />;
    }
  }
  return (
    <div>
      {gurus.map((guru) => (
        <div key={guru._id} className="results-card">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 image-container-card">
              <img src={guru.photo ? `${guru.photo}` : PlaceHolderImg}></img>
            </div>
            <div className="col info-card-container">
              <h1 className="guru-name">{guru.surname}</h1>
              <h2>
                <span>Skills:</span> {guru.skills}
              </h2>

              <Link
                className="btn btn-sm btn-viewPofile"
                to={`/profile/${guru._id}`}
              >
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
