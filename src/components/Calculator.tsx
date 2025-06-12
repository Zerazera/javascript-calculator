import { useState } from "react"
import styled from "@emotion/styled"
import Display from "./Display"
import Buttons from "./Buttons"
import type { buttonInfoType } from "../ButtonsInfo"
import { decode } from "html-entities"
import Stack from "../classes/Stack"
import Queue from "../classes/Queue"

const StyledCalculator = styled.div`
    padding: 5%;
    background-color: black;
    width: 300px;
    aspect-ratio: 3 / 4.2;
    border-radius: 5px;

    @media screen and (height < 502px) {
        width: 170px;
    }
`

export default function Calculator() {
    const [expression, setExpression] = useState('0')
    const [lastExpression, setLastExpression] = useState('')
    const [equalsHit, setEqualsHit] = useState(false)

    const multiplicationSign = decode('&#XD7')
    const divideSign = decode('&#247')

    const operators: Record<string, {precedence: number, infixOperation: (x: number, y: number) => number}> = {
        '+': {
            precedence: 1,
            infixOperation: (x: number, y: number) => x + y
        },
        '-': {
            precedence: 1,
            infixOperation: (x: number, y: number) => x - y
        },
        [multiplicationSign]: {
            precedence: 2,
            infixOperation: (x: number, y: number) => x * y
        },
        [divideSign]: {
            precedence: 2,
            infixOperation: (x: number, y: number) => x / y
        }
    }

    const regex = new RegExp(`([+${multiplicationSign}${divideSign}])|((?<=[\\d.])-)`)
    const expressionTerms = expression.split(regex).filter(x => x)
    const lastTerm = expressionTerms[expressionTerms.length - 1]

    const updateExpression = ({children, id, type}: buttonInfoType) => {
        if (equalsHit) {
            if (type !== 'operator') {
                setExpression('0')
            }

            setLastExpression('')
            setEqualsHit(false)
        }

        switch (type) {
            case 'number':
                if (id === 'zero' && lastTerm === '0') return
                setExpression(expr => (expr === '0' ? '' : expr) + children)
                return

            case 'decimal':
                if (lastTerm in operators || !(lastTerm.includes('.'))) 
                    setExpression(expr => expr.slice(-1) in operators ? expr + '0' + children : expr + children)
                return

            case 'util':
                if (id === 'delete') setExpression(expr => expr.length > 1 ? expr.slice(0, -1) : '0')
                // else id === 'clear'
                else setExpression('0')
                return

            case 'operator':
                if (id === 'subtract') {
                    if (['+', multiplicationSign, divideSign].includes(lastTerm) || 
                    (lastTerm === '-' && !(expressionTerms[expressionTerms.length - 2] in operators)) ||
                    (/[\d\.]/.test(lastTerm))) {
                        setExpression(expr => expr + children)
                    }

                    return;
                }

                if (expression.length > 1 && lastTerm === '-' && expressionTerms[expressionTerms.length - 2] in operators) {
                    setExpression(expr => expr.slice(0, -2) + children)
                    return;
                }

                setExpression(expr => expr.slice(-1) in operators ? expr.slice(0, -1) + children : expr + children)
                return

            case 'equals':
                setEqualsHit(true)
                evaluateExpression()
                return            
        }
    }

    const evaluateExpression = () => {
        // in case our expression ends with an operator
        while (expressionTerms[expressionTerms.length - 1] in operators) expressionTerms.pop()

        // Implements Dijkstra's shunting-yard algorithm. Broadly speaking this is divided into two steps. The first step is to convert the infix expression to a 
        // postfix expression. The second step is to evaluate the postfix expression.
        const operatorStack = new Stack()
        const outputQueue = new Queue()

        expressionTerms.forEach(term => {
            if (term in operators) {
                while (operatorStack.length > 0 && operators[operatorStack.peek()].precedence >= operators[term].precedence) outputQueue.enqueue(operatorStack.pop())
                operatorStack.push(term)
            }
            else outputQueue.enqueue(+term)
        })

        while (operatorStack.length > 0) outputQueue.enqueue(operatorStack.pop())

        // outputQueue is now the postfix expression of the infix expression expressionTerms

        const evaluationStack = new Stack()

        while (outputQueue.length > 0) {
            if (outputQueue.peek() in operators) {
                const operator = outputQueue.dequeue()
                const y = evaluationStack.pop()
                const x = evaluationStack.pop()
                evaluationStack.push(operators[operator].infixOperation(x, y))
            } else evaluationStack.push(outputQueue.dequeue())
        }

        const result = '' + +(evaluationStack.pop().toFixed(8))
        setLastExpression(expression)
        setExpression(result)
    }

    return (        
        <StyledCalculator>
                <Display expression={expression} lastExpression={lastExpression} />
                <Buttons updateExpression={updateExpression} />
        </StyledCalculator>
    )
}