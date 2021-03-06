import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../components/PageNotFound/index";
import ContentLoader from "../components/Loader/index";
import { useMutation } from "@apollo/client";
import { ADD_STUDENT, ADD_GURU } from "../utils/mutations";
import {DropdownButton, Dropdown, Form, Button} from 'react-bootstrap'

import Auth from "../utils/auth";

const Signup = () => {
  
  const [formState, setFormState] = useState({
    surname: "",
    email: "",
    password: "",
    user_type: "",
  });
  const [addStudent, { error, data: dataStudent, loading: loadingStudent }] = useMutation(ADD_STUDENT);
  const [addGuru, { data: dataGuru , loading: loadingGuru}] = useMutation(ADD_GURU);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    if(formState.user_type === 'student'){

      const { data } = await addStudent({
        variables: { ...formState },
      });
  
      Auth.login(data.addStudent.token);
    }else{
      const { data } = await addGuru({
        variables: { ...formState },
      });
  
      Auth.login(data.addGuru.token);

    }
    

  };

  const getAuthorization = localStorage.getItem("id_token");

  if (loadingStudent || loadingGuru) {
    return <ContentLoader />;
  } else if (getAuthorization) {
    return <PageNotFound />;
  }
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {dataStudent || dataGuru ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <Form.Group>
                <Form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="surname"
                    name="surname"
                    type="text"
                    value={formState.surname}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />

                  <DropdownButton
                    id="dropdown-item-button"
                    title="Dropdown button"
                  >
                    <Dropdown.ItemText>Select user type</Dropdown.ItemText>
                    <Dropdown.Item as="button">
                      Student{formState.user_type}
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                      Guru{formState.user_type}
                    </Dropdown.Item>
                  </DropdownButton>

                  <Button
                    className="btn btn-block btn-info"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Form.Group>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {PageNotFound}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
