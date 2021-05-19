import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ImUserPlus, ImRocket } from 'react-icons/im';
import ButtonStyle from '../../styles/Button';
import CustomersTable from '../tables/CustomersTable';

const Customers = () => {
  return (
    <>
      <div className="container">
        <Row className="d-flex align-items-center">
          <Col xs="12">
            <h1 className="py-2">Customers</h1>
          </Col>
          <ButtonStyle variant="light" className="px-3 m-2">
            <ImUserPlus />
            <span className="pl-2">Create Customer</span>
          </ButtonStyle>
          <ButtonStyle variant="light" className="px-3 m-2">
            <ImRocket />
            <span className="pl-2">Submission</span>
          </ButtonStyle>
        </Row>
        <CustomersTable></CustomersTable>
      </div>
    </>
  );
};

export default Customers;
