import { useEffect, useRef } from "react";

/**
 *  Creates a keymap to handle key events and returns two functions. This keymap converts all given keys and keypresses to uppercase.
 *  addKeyMapping: Takes in a key and its mapped function and adds it to the keymap.
 *  removeKeyMapping: Removes a key from the keymap.
 */
export function useKeymap(keyEvent: 'keypress' | 'keydown' | 'keyup') {
    const documentRef = useRef(document)
    const keyMap = useRef<{[key: string]: () => void} | Record<PropertyKey, never>>({})
    
    const addKeyMapping = (key: string, fn: () => void) => {keyMap.current[key.toUpperCase()] = fn}
    const removeKeyMapping = (key: string) => {delete keyMap.current[key.toUpperCase()]}

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {(event.key.toUpperCase() in keyMap.current) && keyMap.current[event.key.toUpperCase()]()}
        
        documentRef.current.addEventListener(keyEvent, handleKeydown)

        return () => documentRef.current.removeEventListener(keyEvent, handleKeydown)
    }, [])

    return {
        addKeyMapping,
        removeKeyMapping
    }
}