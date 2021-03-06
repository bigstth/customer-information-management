import React from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import ButtonStyle from '../../styles/Button';
import axios from 'axios';
import config from '../../config/config.json';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { UserStoreContext } from '../../context/UserContext';
const SignIn = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  });
  const userStore = React.useContext(UserStoreContext);
  React.useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      history.replace('customers');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const res = await axios.post(`${config.API_HOSTNAME}/users/login`, {
        email: input.email,
        password: input.password,
      });
      if (res.status === 200) {
        localStorage.setItem('token', JSON.stringify(res.data));
        const profile = await axios.get(`${config.API_HOSTNAME}/users/me`, {
          headers: {
            Authorization: 'Bearer ' + res.data.auth_token,
          },
        });
        localStorage.setItem('profile', JSON.stringify(profile.data));
        Swal.fire({
          title: 'Success',
          text: 'Welcome.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          const profileData = JSON.parse(localStorage.getItem('profile'));
          userStore.updateProfile(profileData);
          history.replace('/customers');
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Failed',
        text: 'Wrong Email or Password.',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        history.replace('/sign-in');
      });
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

  return (
    <>
      <Container className="p-5">
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <ButtonStyle type="submit" variant="light" className="w-100">
            Sign in
          </ButtonStyle>
        </Form>
      </Container>
    </>
  );
};

export default SignIn;
