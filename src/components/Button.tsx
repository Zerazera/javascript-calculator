import { useState, useRef, useEffect } from "react"
import type { buttonInfoType } from "../ButtonsInfo"
import styled from "@emotion/styled"

const typeColors: Record<string, string> = {
    number: "#3B3B3B",
    operator: "darkorange",
    util: "#6A6A6A",
    decimal: "#3B3B3B",
    equals: "darkorange"
}

const StyledButton = styled.button<{$type: string, $isActive: boolean, id: string}>`
    --background-color: ${({$type, $isActive}) => $isActive ? 'rgba(255, 255, 255, 0.8)' : typeColors[$type]};

    border-radius: 100px;
    aspect-ratio: 1 / 1;
    font-size: 1.7rem;
    padding: 10%;
    background-color: var(--background-color);
    border: 1px solid var(--background-color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.1s linear;
    cursor: pointer;

    @media screen and (height < 502px) {
        font-size: 1rem;
    }
`

type ButtonProps = {
    buttonInfo: buttonInfoType, 
    onClick: () => void,
    addKeyMapping: (key: string, fn: () => void) => void,
    removeKeyMapping: (key: string) => void
}

export default function Button({buttonInfo: {id, children, type, shortcutKeys}, onClick, addKeyMapping, removeKeyMapping}: ButtonProps) {
    const [isActive, setIsActive] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        shortcutKeys.forEach(key => addKeyMapping(key, () => buttonRef.current?.click()))

        return () => shortcutKeys.forEach(key => removeKeyMapping(key))
    }, [])

    const clickHandler = () => {
        setIsActive(true)
        onClick()

        setTimeout(() => setIsActive(false), 100)
    }

    return (
        <StyledButton id={id} $type={type} $isActive={isActive} onClick={clickHandler} ref={buttonRef}>{children}</StyledButton>
    )
}