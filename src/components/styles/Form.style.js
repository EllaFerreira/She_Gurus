import styled from "styled-components";

export const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 40px 0;
`;

export const InputGroup = styled.inputgroup`
background-color: ${({ theme }) => theme.mobile})`;

export const Modal = styled.modal`
  width: 375px;
  margin-left: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 40px 0 30px;
  }
`;
