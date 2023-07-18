import * as React from 'react';
import styled from '@emotion/styled';
import { Icons } from './components';
import { ButtonBase } from '@mui/material';

const StyledHeader = styled.div`
  font-size: 30px;
  line-height: 34px;
  font-family: 'Mollie glaston';
  font-feature-settings: 'liga' 1, 'kern';
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.005em;
`;

const StyledButton = styled(ButtonBase)<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  font-weight: 500;
  border: 1.5px solid #3f937c;
  background-color: #fff;
  color: #101010;
  text-transform: none;
  z-index: 100;
  border-radius: 10px;
  transition: all 0.25s;
  font-size: 20px;
  line-height: 20px;
  padding: 15px;
  margin: ${props => (props.margin ? props.margin : '20px 0 0 0')};

  span {
    margin-top: 12px;
  }

  @media (max-width: 670px) {
    font-size: 16px;
  }

  transition: box-shadow 0.5s, opacity 0.5s;

  &:hover {
    background-color: #285e50;
    border-color: #285e50;
    color: #fff;
    animation: scale 250ms ease-in forwards;
    box-shadow: 0px 20px 20px -10px rgba(0, 0, 0, 0.4);
  }

  @keyframes scale {
    to {
      transform: scale(1.06);
    }
  }

  &:active {
    animation: press 0.2s 1 linear;
  }

  @keyframes press {
    0% {
      transform: scale(1.06);
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.96);
    }
  }
`;

const LinkContainer = styled.div`
  color: #101010;
  font-family: 'Lato-Solace', 'Lato – Solace', 'Lato', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 12.558px;
  letter-spacing: 0.157px;
`;

const StyledLink = styled.a`
  color: #285e50;
  text-decoration: none;
`;

const WhoAreYouHereFor = ({ onSubmit }: { onSubmit: (v: { [hereFor: string]: string }) => void }) => {
  return (
    <div>
      <StyledHeader>Who are you here for?</StyledHeader>
      <StyledButton
        margin='36px 0 24px'
        onClick={() => {
          onSubmit({ hereFor: 'self' });
        }}
      >
        <Icons.SunIcon /> <span>Myself</span>
      </StyledButton>
      <StyledButton
        margin='0 0 24px'
        onClick={() => {
          onSubmit({ hereFor: 'loved_one' });
        }}
      >
        <Icons.HeartIcon />
        <span> My Loved One</span>
      </StyledButton>

      <LinkContainer>
        Already have an account?{' '}
        <StyledLink href='https://app.solace.health/login' target='_blank' rel='noreferrer'>
          Log in
        </StyledLink>
      </LinkContainer>
    </div>
  );
};

export default WhoAreYouHereFor;
