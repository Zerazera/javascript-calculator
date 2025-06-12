import styled from "@emotion/styled"
import Calculator from "./components/Calculator"
import { decode } from "html-entities"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const Title = styled.h1`
  height: 2rem;
  font-size: 2rem;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Section = Main.withComponent('section')

const UnorderedList = styled.ul`
  font-size: 1.2rem;

  li {
    list-style-type: none;
  }

  li:first-of-type {
    font-weight: bold;  
  }
`

export default function App() {
  return (
    <Body>
      <header>
        <Title>Javascript Calculator</Title>
      </header>
      <Main>
        <Section>
          <Calculator />
        </Section>
        <Section>
          <UnorderedList>
            <li>Use the keyboard:</li>
            <li>AC - Space</li>
            <li>Delete - Backspace</li>
            <li>{decode('&#XD7')} - *</li>
            <li>{decode('&#247')} - /</li>
            <li>= - = or Enter</li>
            <li>All other keys map to the same key on the keyboard.</li>
          </UnorderedList>
        </Section>
      </Main>
    </Body>
  )
}