import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { STUDENT_LOGIN, GURU_LOGIN } from "../utils/mutations";
import ContentLoader from "../components/Loader/index";
import PageNotFound from "../components/PageNotFound/index";

import Auth from "../utils/auth";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [loginStudent, { error, loading: loadingStudent, data: dataStudent }] =
    useMutation(STUDENT_LOGIN);
  const [loginGuru, { loading: loadingGuru, data: dataGuru }] =
    useMutation(GURU_LOGIN);

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
      const { data } = await loginStudent({
        variables: { ...formState },
      });
    
      Auth.login(data.loginStudent.token);
    }else{
      const { data } = await loginGuru({
        variables: { ...formState },
      });
      Auth.login(data.loginGuru.token);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  const getAuthorization = localStorage.getItem("id_token");

  if (loadingGuru || loadingStudent) {
    return <ContentLoader />;
  } else if (getAuthorization) {
    return <PageNotFound />;
  }

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {(dataStudent || dataGuru) ? (
              <p>
                Yeah, You made it! {" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
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
}
