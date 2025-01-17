import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { desktop, mobile } from '../../Me/styles/shared/devices';

function LoginNavigation() {
  const { loginWithRedirect } = useAuth0();

  return (
    <LoginArea>
      <LoginAreaItem onClick={() => loginWithRedirect()}>
        Login / Register
      </LoginAreaItem>
    </LoginArea>
  );
}

const LoginAreaItem = styled.button`
  background: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;

  @media ${mobile} {
    color: #fff;
    text-align: start;
  }

  @media ${desktop} {
    color: #69d5b1;

    &:hover {
      color: #54aa8d;
    }
  }
`;

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 40px;

  @media all and (min-width: 800px) {
    margin: 0 20px;
    flex-direction: row;

    * {
      margin-left: 20px;
    }
  }
`;

export default LoginNavigation;
