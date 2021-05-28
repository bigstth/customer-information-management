import React from 'react';
import { Container, Form, Col, Spinner, Button } from 'react-bootstrap';
import ButtonStyle from '../../styles/Button';
import { ImUserPlus, ImUndo2 } from 'react-icons/im';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import config from '../../config/config.json';

const CustomerForm = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const token = JSON.parse(localStorage.getItem('token'));

  const [input, setInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    congenitalDisease: '',
    drugAllergy: '',
    symptom: '',
    diagnosis: '',
    caretakerDoctor: '',
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
      const res = await axios.post(
        `${config.API_HOSTNAME}/customers`,
        {
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email,
          phone_number: input.phoneNumber,
          date_of_birth: input.dateOfBirth,
          weight: input.weight,
          congenital_disease: input.congenitalDisease || null,
          drug_allergy: input.drugAllergy || null,
          symptom: input.symptom || null,
          diagnosis: input.diagnosis || null,
          caretaker_doctor: input.caretakerDoctor || null,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token.auth_token,
          },
        }
      );
      if (res.status === 201 || res.status === 204) {
        Swal.fire({
          title: 'Success',
          text: 'Customer has been created',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          history.replace('/customers');
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

            <Form.Group as={Col} lg="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                maxLength={10}
                minLength={10}
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="congenitalDisease">
              <Form.Label>Congenital Disease</Form.Label>
              <Form.Control
                type="text"
                name="congenitalDisease"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="drugAllergy">
              <Form.Label>Drug Allergy</Form.Label>
              <Form.Control
                type="text"
                name="drugAllergy"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="symptom">
              <Form.Label>Symptom</Form.Label>
              <Form.Control
                type="text"
                name="symptom"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="diagnosis">
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                type="text"
                name="diagnosis"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg="6" controlId="caretakerDoctor">
              <Form.Label>Caretaker Doctor</Form.Label>
              <Form.Control
                type="text"
                name="caretakerDoctor"
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
                <ImUserPlus className="mr-1"></ImUserPlus> Create Customer
              </ButtonStyle>
            </Form.Group>
            <Form.Group
              as={Col}
              lg="12"
              className="d-flex justify-content-center"
            >
              <Button
                variant="dark"
                size="sm"
                className="text-center w-100"
                onClick={() => {
                  history.goBack();
                }}
              >
                <ImUndo2 className="mr-1"></ImUndo2> Back
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    </>
  );
};

export default CustomerForm;
