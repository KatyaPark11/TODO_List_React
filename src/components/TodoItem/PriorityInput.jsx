import styled from "styled-components";
import {useUpdateTodoItem} from "../../data/hooks/useData";
import {useState} from "react";

const ImageContainer = styled.div`
    display: flex;
    gap: 5px;
`

const Image = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    opacity: ${props => (props.selected ? 1 : 0.5)};
    transition: opacity 0.3s;
`

export const PriorityInput = ({id, checked, priority, setPriorityForNewTask}) => {
    const {mutate} = useUpdateTodoItem();
    const [selectedPriority, setSelectedPriority] = useState(priority || 1);

    const onClickHandler = (num) => {
        setSelectedPriority(num);
        if (setPriorityForNewTask) {
            setPriorityForNewTask(num);
        }
        mutate({id, checked, priority: num});
    };

    return (
        <ImageContainer>
            {[1, 2, 3].map(num => (
                <Image
                    key={num}
                    src={`assets/images/png/Priority${num}.png`}
                    alt={`Priority ${num}`}
                    selected={selectedPriority === num}
                    onClick={() => onClickHandler(num)}
                />
            ))}
        </ImageContainer>
    );
}