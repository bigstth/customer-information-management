import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { format } from 'date-fns';

const HistoryTable = ({ histories }) => {
  return (
    <>
      <Container className="pt-5">
        <h1>History logs</h1>
        <Table className="mt-3" hover responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Action</th>
              <th>Customer</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((info, index) => {
              return (
                <tr key={info.id}>
                  <td>{index + 1}</td>
                  <td>{info.user}</td>
                  <td>{info.action}</td>
                  <td>{info.customer}</td>
                  <td>
                    {format(new Date(info.createdAt), 'dd/MM/yyyy - HH:mm')}
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

export default HistoryTable;
