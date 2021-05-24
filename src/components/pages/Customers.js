import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ImUserPlus, ImRocket } from 'react-icons/im';
import ButtonStyle from '../../styles/Button';
import CustomersTable from '../tables/CustomersTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../config/config.json';
import { useHistory } from 'react-router-dom';
const Customers = () => {
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const profile = JSON.parse(localStorage.getItem('profile'));

  async function submission() {
    if (customers.length === 0) {
      Swal.fire({
        title: 'Customers not found',
        text: `No customers with UnSubmit status.`,
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${config.API_HOSTNAME}/customers/submission`,
        {
          userId: profile.id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token.auth_token,
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: 'Success',
          text: `You've Submitted all customers`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          getData();
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmission() {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Are you sure to Submission all customers ?',
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(function (isConfirm) {
      if (isConfirm.isConfirmed) {
        submission();
      } else {
        return;
      }
    });
  }

  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get(`${config.API_HOSTNAME}/customers`, {
        headers: {
          Authorization: 'Bearer ' + token.auth_token,
        },
      });
      if (res.status === 200) {
        setCustomers(res.data.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);
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
      <Container>
        <Row className="d-flex align-items-center mb-4">
          <Col xs="12">
            <h1 className="pt-5">Customers</h1>
          </Col>
          <ButtonStyle
            variant="light"
            className="px-3 m-2"
            onClick={() => {
              history.push('/create-customer');
            }}
          >
            <ImUserPlus />
            <span className="pl-2">Create Customer</span>
          </ButtonStyle>
          <ButtonStyle variant="light" className="px-3 m-2">
            <ImRocket />
            <span className="pl-2" onClick={handleSubmission}>
              Submission
            </span>
          </ButtonStyle>
        </Row>
        <CustomersTable
          customers={customers}
          reloadData={getData}
          error={setError}
        ></CustomersTable>
      </Container>
    </>
  );
};

export default Customers;
