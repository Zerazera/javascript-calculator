import styled from "@emotion/styled"

const StyledDisplay = styled.div`
    text-align: right;
    margin-bottom: 3%;
    display; flex;
    flex-direction: column;
`

const MainDisplay = styled.div`
    color: white;
    height: 4.4rem;
    font-size: 3rem;
    font-weight: bold;
    overflow: auto hidden;
    scrollbar-color: white black;
`

const LastDisplay = styled.div`
    color: grey;
    height: 3.4rem;
    font-size: 2rem;
    font-weight: bold;
    overflow: auto hidden;
    scrollbar-color: grey black;
`

export default function Display({expression, lastExpression}: {expression: string, lastExpression: string}) {
    return (
        <StyledDisplay>
            <LastDisplay>
                {lastExpression}
            </LastDisplay>
            <MainDisplay id="display">
                {expression}
            </MainDisplay>            
        </StyledDisplay>
    )
}