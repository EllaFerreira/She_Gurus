import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import PhotoHolder from "../PhotoHolder/index";
import { Modal, Button } from "react-bootstrap";
import Auth from "../../utils/auth";
import { UPDATE_GURU } from "../../utils/mutations";

export default function GuruProfileModal({ guru, show, handleClose }) {
  const [updateGuru, { error }] = useMutation(UPDATE_GURU);

  const [formState, setFormState] = useState({
    guruId: `${guru._id}`,
    surname: `${guru.surname}`,
    email: `${guru.email}`,
    photo: `${guru.photo}`,
    skills: `${guru.skills}`,
    location: `${guru.location}`,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateGuru({
        variables: { ...formState },
      });

      Auth.login(data.updateGuru.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAWS = async (photo) => {
    await setFormState({
      ...formState,
      photo: photo.photo ? photo.photo : formState.photo,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row" onSubmit={handleFormSubmit}>
            <div className="col-12">
              <label htmlFor="validationCustom01" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="surname"
                name="surname"
                value={formState.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="validationCustom01" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="email@email.com"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="validationCustom01" className="form-label">
                Skills
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Skills"
                name="skills"
                value={formState.skills}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="validationCustom01" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="location"
                name="location"
                value={formState.location}
                onChange={handleChange}
                required
              />
            </div>
            <FileUpload handleAWS={handleAWS} />

            <div className="col-12">
              <button
                className="btn btn-primary update-tutor-btn"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
