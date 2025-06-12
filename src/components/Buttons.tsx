import styled from "@emotion/styled"
import { buttonsInfo, type buttonInfoType } from "../ButtonsInfo"
import Button from "./Button"
import { useKeymap } from "../hooks/useKeymap"

const StyledButtons = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1;
    display: grid;
    grid-template: repeat(5, 1fr) / repeat(4, 1fr);
    grid-gap: 2%;
`

export default function Buttons({updateExpression}: {updateExpression: (btnInfo: buttonInfoType) => void}) {
    const {addKeyMapping, removeKeyMapping} = useKeymap('keydown')

    return (
        <StyledButtons>
            {buttonsInfo.map(buttonInfo => buttonInfo.type === 'placeholder' ? 
                <div key={buttonInfo.id} /> : 
                <Button 
                    key={buttonInfo.id} 
                    buttonInfo={buttonInfo} 
                    onClick={() => updateExpression(buttonInfo)}
                    addKeyMapping={addKeyMapping}
                    removeKeyMapping={removeKeyMapping}
                />)}
        </StyledButtons>
    )
}