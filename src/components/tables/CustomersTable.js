import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { ImEye, ImFolderDownload, ImBin2 } from 'react-icons/im';

const CustomersTable = () => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Customer No.</th>
            <th>Full Name</th>
            <th>Created Date</th>
            <th>Handle Customer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Sitthi Thammawong</td>
            <td>19-5-2021</td>
            <td className="d-flex">
              <Button
                variant="outline-info"
                size="sm"
                className="px-3 m-2 d-flex align-items-center"
              >
                <ImEye />
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                className="px-3 m-2 d-flex align-items-center"
              >
                <ImFolderDownload />
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                className="px-3 m-2 d-flex align-items-center"
              >
                <ImBin2 />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CustomersTable;
