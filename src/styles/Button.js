import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { device } from './Device';

const ButtonStyle = styled(Button)`
  background-color: #0096c7;
  color: #caf0f8;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  &:hover {
    background: #48cae4;
  }
  @media ${device.mobile} {
    width: 100%;
  }
`;

export default ButtonStyle;
