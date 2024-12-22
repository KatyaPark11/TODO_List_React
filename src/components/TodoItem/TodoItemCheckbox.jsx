import styled, {css} from "styled-components";
import {useUpdateTodoItem} from "../../data/hooks/useData";

const checkedCss = css`
  background-image: url(assets/images/png/check.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 85%;
`

export const CheckboxContainer = styled.span(props => {
  return `
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #344659;
    border: 2px solid #E6D3BF;
    border-radius: 6px;
    cursor: pointer;
    ${props.checked ? checkedCss : ''}
  `;
});


export const TodoItemCheckbox = ({ checked, id, priority }) => {
    const { mutate } = useUpdateTodoItem();
    const onClickHandler = () => {
        mutate({ id, checked: !checked, priority });
    };
    return <CheckboxContainer checked={checked} onClick={onClickHandler} />
}