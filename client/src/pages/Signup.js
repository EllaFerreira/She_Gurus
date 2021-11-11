import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound/index";
import { Loader } from "../components/Loader/index";
import { useMutation } from "@apollo/client";
import { ADD_STUDENT, ADD_GURU } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    surname: "",
    email: "",
    password: "",
    user_type: "",
  });
  const [addUser, { error, data, loading }] = useMutation(
    ADD_STUDENT,
    ADD_GURU
  );

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

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addStudent.token);
    } catch (e) {
      console.error(e);
    }
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addGuru.token);
    } catch (e) {
      console.error(e);
    }
  };

  const getAuthorization = localStorage.getItem("id_token");

  if (loading) {
    return <Loader />;
  } else if (getAuthorization) {
    return <PageNotFound />;
  }
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
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
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
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
