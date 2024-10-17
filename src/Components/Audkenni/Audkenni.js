import "bootstrap/dist/css/bootstrap.min.css";
import "./Audkenni.scss";
import RecentAuths from "../RecentAuths/RecentAuths";
import Simaskra from "../Simaskra/Simaskra";
import isValid from "../../Util/Validators";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function Audkenni() {
  // States
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [lastUser, setLastUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(40);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState([]);
  const [isValidInput, setIsValidInput] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  // Other vars
  const apiUrl = process.env.REACT_APP_API_URL;

  // Timer logic when isTimerActive is true
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      clearInterval(interval); // Clear the timer when it reaches 0
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // Input validation for the input field
  useEffect(() => {
    setIsValidInput(isValid(input));
  }, [input]);

  /**
   * Send the phone number SSO to server for authentication
   */
  async function fetchUser() {
    if (!isValidInput) {
      setErrors([...errors, "Invalid input"]);
      return;
    }

    setLoading(true);
    setIsTimerActive(true);

    await fetch(
      `${apiUrl}/AuthenticateUser?userIdentifier=${input.replace("-", "")}`,
      {
        method: "POST",
      }
    ).then((resp) => {
      setUserAuthenticated(resp.status === 200);
      setShouldRefresh((prev) => !prev);
    });

    resetInput();
  }

  /**
   * Handle number selection from the Simaskra component
   * @param {string} number
   */
  function handleNumberSelect(number) {
    setSelectedNumber(number);
    setInput(number);
  }

  /**
   * Reset the input fields and other states
   */
  function resetInput() {
    setIsTimerActive(false);
    setLoading(false);
    setTimer(40);
    setInput("");
    setErrors([]);
    setIsValidInput(false);

    // Timeout for the success message
    setTimeout(() => {
      setLastUser("");
      setUserAuthenticated(false);
    }, 3000);
  }

  return (
    <>
      <Container className="mainSection">
        <Row>
          <Col>
                <Simaskra onNumberSelect={handleNumberSelect} />
          </Col>

          <Col>
            <div className="audkenni">
              {isTimerActive && <h1 style={{ color: "white" }}>{timer}</h1>}
              <label className="idLabel">Kennitala/Símanúmer:</label>
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="idInput"
                value={selectedNumber || input}
              />

              <Button onClick={fetchUser} variant="custom" className="btn-custom">
                Senda
              </Button>

              <h1 style={{ color: "red" }}>
                {!isValidInput && errors.length > 0 && "Villa!"}
              </h1>

              <h1 style={{ color: "white" }}>
                {userAuthenticated && `Notandi ${lastUser} skráður`}
              </h1>

              {loading && (
                <>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>Tengiliðir:</h2>
              <a href="https://www.arion.is" target="_blank" rel="noreferrer">Arion</a>
              <a href="https://audkenni.is" target="_blank" rel="noreferrer">Auðkenni</a>
              <a href="https://islandsbanki.is" target="_blank" rel="noreferrer">Íslandsbanki</a>
              <a href="https://landsbankinn.is" target="_blank" rel="noreferrer">Landsbanki</a>
              <a href="https://kvika.is" target="_blank" rel="noreferrer">Kvika</a>
            </div>
          </Col>
          <Col>
            <RecentAuths shouldRefresh={shouldRefresh} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
