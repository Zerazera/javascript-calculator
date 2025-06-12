import type { ReactNode } from "react"
import { decode } from "html-entities"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons"

export type buttonInfoType = {
    children: ReactNode,
    id: string,
    type: 'number' | 'operator' | 'util' | 'decimal' | 'placeholder' | 'equals',
    shortcutKeys: string[]
}

export const buttonsInfo: buttonInfoType[] = [
    {
        children: 'AC',
        id: 'clear',
        type: 'util',
        shortcutKeys: [' ']
    },
    {
        children: <FontAwesomeIcon icon={faDeleteLeft} />,
        id: 'delete',
        type: 'util',
        shortcutKeys: ['Backspace']
    },
    {
        children: '',
        id: 'placeholder',
        type: 'placeholder',
        shortcutKeys: []
    },
    {
        children: decode('&#247'),
        id: 'divide',
        type: 'operator',
        shortcutKeys: ['/']
    },
    {
        children: '7',
        id: 'seven',
        type: 'number',
        shortcutKeys: ['7']
    },
    {
        children: '8',
        id: 'eight',
        type: 'number',
        shortcutKeys: ['8']
    },
    {
        children: '9',
        id: 'nine',
        type: 'number',
        shortcutKeys: ['9']
    },
    {
        children: decode('&#XD7'),
        id: 'multiply',
        'type': 'operator',
        'shortcutKeys': ['*']
    },
    {
        children: '4',
        id: 'four',
        type: 'number',
        shortcutKeys: ['4']
    },
    {
        children: '5',
        id: 'five',
        type: 'number',
        shortcutKeys: ['5']
    },
    {
        children: '6',
        id: 'six',
        type: 'number',
        shortcutKeys: ['6']
    },
    {
        children: '-',
        id: 'subtract',
        type: 'operator',
        shortcutKeys: ['-']
    },
    {
        children: '1',
        id: 'one',
        type: 'number',
        shortcutKeys: ['1']
    },
    {
        children: '2',
        id: 'two',
        type: 'number',
        shortcutKeys: ['2']
    },
    {
        children: '3',
        id: 'three',
        type: 'number',
        shortcutKeys: ['3']
    },
    {
        children: '+',
        id: 'add',
        type: 'operator',
        shortcutKeys: ['+']
    },
    {
        children: '',
        id: 'placeholder1',
        type: 'placeholder',
        shortcutKeys: []
    },
    {
        children: '0',
        id: 'zero',
        type: 'number',
        shortcutKeys: ['0']
    },
    {
        children: '.',
        id: 'decimal',
        type: 'decimal',
        shortcutKeys: ['.']
    },
    {
        children: '=',
        id: 'equals',
        type: 'equals',
        shortcutKeys: ['Enter', '=']
    }
]