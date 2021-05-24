import React from 'react';
import { Container, Form, Col, Spinner } from 'react-bootstrap';
import ButtonStyle from '../../styles/Button';
import { ImUserPlus } from 'react-icons/im';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import config from '../../config/config.json';

const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [input, setInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${config.API_HOSTNAME}/users/register`, {
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        password: input.password,
      });
      if (res.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'User has been created',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          history.replace('/sign-in');
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading === true) {
    return (
      <>
        <Container className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Container className="d-flex justify-content-center mt-5">
          <h2> Something went wrong</h2>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container className="mt-4">
        <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Group as={Col} lg="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} lg="6" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              lg="12"
              className="d-flex justify-content-center"
            >
              <ButtonStyle
                type="submit"
                variant="light"
                className="text-right w-100"
              >
                <ImUserPlus className="mr-1"></ImUserPlus> Register
              </ButtonStyle>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    </>
  );
};

export default Register;
