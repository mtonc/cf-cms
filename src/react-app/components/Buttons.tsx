import styled, { css } from "styled-components";
import { useForm } from "$store/formSettings";
import { MouseEventHandler, useContext } from "react";
import { FormCTX } from "../contexts/FormContext";

type ButtonType = "submit" | "button";
type CustomType =  "delete" | undefined;

interface Props {
  type: ButtonType;
  customType?: CustomType;
  value: string;
}

const style = css`
float: right;
margin: 1rem 0.5rem;
padding: 0.5rem 1rem;
border: 1px solid transparent;
border-radius: 0.5rem;
color: #000;
font-weight: bold;
background-color: gray;
  &:hover{
    background-color: dimgray
`;

const StyledButton = styled.button.attrs<{ $type: ButtonType } >(({ $type }) => ({
 type: $type
}))`${style}`


const SubmitButton = styled(StyledButton).attrs<{
  $handle: MouseEventHandler
}>(({ $handle}) => ({
  onClick: $handle,
}))`
background-color: green;
  &:hover {
    background-color: lime;
`;

const DeleteButton = styled(StyledButton).attrs<{
  $handle: MouseEventHandler
}>(({ $handle}) => ({
  onClick: $handle,
}))`
background-color: firebrick;
  &:hover {
    background-color: tomato;
`;

const Button = ({type, customType, value}: Props) => {
  const formRef = useContext(FormCTX);
  const [handleDelete, handleSumbmit] = useForm(formRef);
  
    if (type === 'submit') {
      return <SubmitButton $type={type} $handle={handleSumbmit}>{value}</SubmitButton>
    }
    if (type === 'button' && customType === 'delete') {
      return <DeleteButton $type={type} $handle={handleDelete}>{value}</DeleteButton>;
    }
    return <StyledButton $type={type}>{value}</StyledButton>
}

export default Button;