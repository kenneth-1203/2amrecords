import styled from "styled-components";

export const TimerContainer = styled.div`
  padding: 0.4rem;

  ${(props) => props.theme.sizes.mobile} {
    text-align: center;
  }
`;
