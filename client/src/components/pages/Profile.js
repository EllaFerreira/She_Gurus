import { useState, React } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";
import { ONE_STUDENT_BY_ID } from "../../utils/queries";
import StudentProfileModal from "../StudentProfileModal/index";
// import GuruProfileModal from "../GuruProfileModal/index";
import GuruProfileList from "../GuruProfileList";
import ContentLoader from "../Loader/index";
import PageNotFound from "../PageNotFound/index";

const Profile = () => {
  const [show, setShow] = useState("");

  const { studentId } = useParams();
  const handleClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);

  const { loading, data } = useQuery(ONE_STUDENT_BY_ID, {
    variables: { studentId: studentId },
  });

  const profile = data?.onestudent || {};
  const getToken = localStorage.getItem("id_token");

  if (loading) {
    return <ContentLoader />;
  } else if (!getToken) {
    return <PageNotFound />;
  }

  return (
    <div className="studentProfile-main">
      <div className="studentProfile-wrapper">
        <div className="row justify-content-center">
          <div className="col">
            <h1>My Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">{profile.photo}</div>
        </div>
        <div className="row student-info">
          <div className="col">
            <h1 className="studentProfile-tag">Surname:</h1>
            <h2 className="studentProfile-text">{profile.surname}</h2>
          </div>
        </div>

        <div className="row student-info">
          <div className="col">
            <h1 className="studentProfile-tag">Email:</h1>
            <h2 className="studentProfile-text">{profile.email}</h2>
          </div>
        </div>
        <Button className="btn btn-editStudent" onClick={handleModalOpen}>
          Edit your Profile
        </Button>
      </div>

      <div className="row allTutors-container">
        {!profile.matchs.length ? (
          <p>You haven't found any guru yet...</p>
        ) : (
          <GuruProfileList orders={profile.matchs} />
        )}
      </div>
      <StudentProfileModal
        student={show}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Profile;
