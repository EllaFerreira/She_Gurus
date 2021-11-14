import styled from "styled-components";

const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 40px 0;
`;
export default StyledForm;

const InputGroup = styled.inputgroup`
background-color: ${({ theme }) => theme.mobile})`;

export default InputGroup

const Modal = styled.modal`
  width: 375px;
  margin-left: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 40px 0 30px;
  }
`;
export default Modal