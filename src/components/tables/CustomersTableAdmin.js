import React from 'react';
import { Table, Button, Container, Dropdown } from 'react-bootstrap';
import { ImEye, ImFolderDownload, ImBin2 } from 'react-icons/im';
import Swal from 'sweetalert2';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/config.json';

const CustomersTable = (props) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();
  async function changeStatus(status) {
    try {
      const [statusName, customerId] = status.split(' ');
      const res = await axios.post(
        `${config.API_HOSTNAME}/customers/changeStatus`,
        {
          id: customerId,
          status: statusName,
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
          text: `Status have been changed to ${statusName}`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          props.reloadData();
        });
      }
    } catch (error) {}
  }

  function handleChangeStatus(status) {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Are you sure to change status ?',
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(function (isConfirm) {
      if (isConfirm.isConfirmed) {
        changeStatus(status);
      } else {
        return;
      }
    });
  }
  async function deleteCustomer(customerId) {
    try {
      const res = await axios.delete(
        `${config.API_HOSTNAME}/customers/${customerId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token.auth_token,
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Customer has been deleted',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          props.reloadData();
        });
      }
    } catch (error) {}
  }

  function handleDeleteCustomer(customerId) {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Are you sure to delete customer ?',
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(function (isConfirm) {
      if (isConfirm.isConfirmed) {
        deleteCustomer(customerId);
      } else {
        return;
      }
    });
  }
  return (
    <>
      <Container className="pt-5">
        <h1>Customer Management</h1>
        <Table className="mt-3" hover responsive height={400}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Full Name</th>
              <th>Symptom</th>
              <th>Caretaker Doctor</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.customers.map((customer, index) => {
              return (
                <tr key={customer._id}>
                  <td>{index + 1}</td>
                  <td>
                    {customer.first_name} {customer.last_name}
                  </td>
                  <td>{customer.symptom}</td>
                  <td>{customer.caretaker_doctor}</td>
                  <td>
                    {format(new Date(customer.createdAt), 'dd/MM/yyyy - HH:mm')}
                  </td>
                  <td>
                    {' '}
                    <Dropdown onSelect={handleChangeStatus}>
                      <Dropdown.Toggle
                        variant="outline-dark"
                        id="dropdown-basic"
                      >
                        {customer.status}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey={`UnSubmit ${customer._id}`}>
                          UnSubmit
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={`Submitted ${customer._id}`}>
                          Submitted
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={`Reviewing ${customer._id}`}>
                          Reviewing
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={`Approved ${customer._id}`}>
                          Approved
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={`Rejected ${customer._id}`}>
                          Rejected
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td className="d-flex">
                    <Link to={`/customer/${customer._id}`}>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="px-3 m-2 d-flex align-items-center"
                      >
                        <ImEye />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="px-3 m-2 d-flex align-items-center"
                      onClick={() => {
                        history.push(`/pdf/${customer._id}`);
                      }}
                    >
                      <ImFolderDownload />
                    </Button>
                    <Button
                      onClick={handleDeleteCustomer.bind(this, customer._id)}
                      variant="outline-info"
                      size="sm"
                      className="px-3 m-2 d-flex align-items-center"
                    >
                      <ImBin2 />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default CustomersTable;
