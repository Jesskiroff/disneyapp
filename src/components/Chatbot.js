import {
  Row,
  Col,
  Container as BootstrapContainer,
  Button as BootstrapButton,
  Form,
  Spinner as BootstrapSpinner,
} from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";

const PARAMS = {
  temperature: 0.5,
  max_tokens: 256,
};

const apiKey = process.env.REACT_APP_OPENAI_KEY;

const StyledContainer = styled(BootstrapContainer)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const FormInput = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const StyledButton = styled(BootstrapButton)`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const StyledSpinner = styled(BootstrapSpinner)`
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spinner-border 0.75s linear infinite;
  margin: 0 auto;

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
`;

function Chatbot() {
  const [questionType, setQuestionType] = useState("general");
  const [cbResponse, setCbResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getInstructions = (qt, input) => {
    let prompt;
    switch (qt) {
      case "general":
        prompt = input;
        break;
      case "translate":
        prompt = `translate this text to Spanish: ${input}`;
        break;
      case "weather":
        prompt = `if the question is related to weather - answer it:${input}, else say: can't answer this.`;
        break;
      default:
        prompt = input;
    }
    return prompt;
  };

  const handleSendData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const prompt = getInstructions(questionType, userInput);
    const endpoint =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const body = { ...PARAMS, prompt };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    setCbResponse(data.choices[0].text);
    setIsLoading(false);
  };

  return (
    <StyledContainer className="mt-3">
      <Content>
        <Row>
          {["general", "translate", "weather"].map((el) => {
            return (
              <Col key={el}>
                <StyledButton
                  variant="primary"
                  onClick={() => setQuestionType(el)}
                >
                  {el}
                </StyledButton>
              </Col>
            );
          })}
        </Row>
        <h3 className="my-3">
          Question type: <b>{questionType}</b>
        </h3>
        <Form onSubmit={handleSendData}>
          <FormInput
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <StyledButton variant="info" type="submit" className="mt-3">
            submit
          </StyledButton>
        </Form>
        <FormContainer className="mt-3">
          {isLoading ? (
            <StyledSpinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </StyledSpinner>
          ) : cbResponse ? (
            cbResponse
          ) : (
            "no question asked"
          )}
        </FormContainer>
      </Content>
    </StyledContainer>
  );
}

export default Chatbot;
