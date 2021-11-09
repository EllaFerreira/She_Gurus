import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_SIGN_IN } from "../utils/mutations";
import auth from "../utils/auth";
import { Container } from "../components/styles/Container.style";
import { Button } from "../components/styles/Button.style";
import { Form, InputGroup } from "react-bootstrap";

const SignIn = (props) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [SignIn, { error, data }] = useMutation(USER_SIGN_IN);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await SignIn({
        variables: { ...form },
      });

      auth.SignIn(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <Container></Container>
        {/* <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body"> */}
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              value={setForm.email}
              onChange={handleChange}
            />
            <InputGroup
              className="form-input"
              placeholder="password"
              name="password"
              type="password"
              value={setForm.password}
              onChange={handleChange}
            />
            <Button>Sign in</Button>
          </Form>
        )}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </main>
  );
};

export default SignIn;
