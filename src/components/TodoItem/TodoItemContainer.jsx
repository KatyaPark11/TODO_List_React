import styled, {css} from 'styled-components';

const isNewTodoItemCss = css`
  border-top: 2px solid #E6D3BF;
  padding-top: 20px;
`

const Root = styled.div(props => {
  return `
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px 0;
    ${props.isNewTodoItem ? isNewTodoItemCss : ''}
  `
})

export const TodoItemContainer = ({isNewTodoItem, children, style}) => {
  return <Root style={style} isNewTodoItem={isNewTodoItem}>{children}</Root>
}