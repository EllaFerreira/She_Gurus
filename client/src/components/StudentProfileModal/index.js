import React from "react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Auth from "../../utils/auth";
import { UPDATE_STUDENT } from "../../utils/mutations";

export default function StudentProfileModal({ student, show, handleClose }) {
  const [updateStudent, { error }] = useMutation(UPDATE_STUDENT);
  const [formState, setFormState] = useState({
    studentId: `${student._id}`,
    surname: `${student.surname}`,
    email: `${student.email}`,
    
    password: "",
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
      const { data } = await updateStudent({
        variables: { ...formState },
      });

      Auth.login(data.updateStudent.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Profile</Modal.Title>
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
                placeholder="Mark"
                name="firstName"
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
                placeholder="email address"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="validationCustom01" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="validationCustom01"
                placeholder=""
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary update-btn-profile"
                type="submit"
              >
                Update Profile
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
