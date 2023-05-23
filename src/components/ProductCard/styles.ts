import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  box-shadow: 0 4px 8px -4px ${(props) => props.theme.colors.primary[400]};
  height: 36rem;
  width: 20rem;
  margin: 0.4rem;
`;

export const CardBody = styled.div`
  height: 100%;
  width: 20rem;
`;

export const CardImage = styled.div`
  height: 60%;
  width: 100%;
`;

export const CardContent = styled.div`
  height: 40%;
  width: 100%;
  text-align: start;
`;

export const Container = styled.div`
  padding: 1rem;
`;
