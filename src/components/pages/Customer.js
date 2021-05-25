import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config.json';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Spinner, Jumbotron } from 'react-bootstrap';
import { ImUser, ImFileText, ImUndo2, ImFolderDownload } from 'react-icons/im';
import ButtonStyle from '../../styles/Button';

const Customer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    async function getData(id) {
      try {
        setLoading(true);
        const res = await axios.get(`${config.API_HOSTNAME}/customers/${id}`, {
          headers: {
            Authorization: 'Bearer ' + token.auth_token,
          },
        });
        if (res.status === 200) {
          setCustomer(res.data.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getData(id);
  }, [id]);

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
      <Container className="text-center pt-5">
        <Jumbotron>
          <h1>
            {customer.customer.first_name} {customer.customer.last_name}
          </h1>
          <hr></hr>

          <Row className="justify-content-center mt-3">
            <Col lg={6} className="d-flex align-items-center">
              <h3>
                <ImUser></ImUser>
              </h3>
              <h5>
                <b>Personal Information</b>
              </h5>
            </Col>
          </Row>
          <div className="p-2">
            <Row className="justify-content-center mt-3">
              <Col lg={2} className="d-flex">
                <b>Name</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.first_name} {customer.customer.last_name}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Email</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.email}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Phone number</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.phone_number}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Date of birth</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.date_of_birth}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Weight</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.weight} kgs.
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Cogenital Disease</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.congenital_disease}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Drug Allergy</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.drug_allergy}
              </Col>
            </Row>
          </div>
          <Row className="justify-content-center mt-3">
            <Col lg={6} className="d-flex align-items-center">
              <h3 className="mr-1">
                <ImFileText></ImFileText>
              </h3>
              <h5>
                <b>Treatment Record</b>
              </h5>
            </Col>
          </Row>
          <div className="p-2">
            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Symptom</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.symptom}
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Diagnosis</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.diagnosis}
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={2} className="d-flex">
                <b>Caretaker Doctor</b>
              </Col>
              <Col lg={4} className="d-flex justify-content-start">
                {customer.customer.caretaker_doctor}
              </Col>
            </Row>
          </div>
        </Jumbotron>
        <Row className="flex-row">
          <ButtonStyle
            variant="light"
            className="px-3 m-2"
            onClick={() => {
              history.goBack();
            }}
          >
            <ImUndo2 />
            <span className="pl-2">Back</span>
          </ButtonStyle>

          <ButtonStyle
            variant="light"
            className="px-3 m-2"
            onClick={() => {
              history.push(`/pdf/${customer.customer._id}`);
            }}
          >
            <ImFolderDownload></ImFolderDownload>
            <span className="pl-2">Download PDF </span>
          </ButtonStyle>
        </Row>
      </Container>
    </>
  );
};

export default Customer;
