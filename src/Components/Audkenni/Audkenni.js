import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Audkenni.scss";
import { Button, Toast } from "react-bootstrap";
import RecentAuths from "../RecentAuths/RecentAuths";
import Simaskra from "../Simaskra/Simaskra";
import isValid from "../../Util/Validators";

export default function Audkenni() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [lastUser, setLastUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(40);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState([]);
  const [isValidInput, setIsValidInput] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

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

  useEffect(() => {
    setIsValidInput(isValid(input));
  }, [input]);

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
    });

    resetInput();
  }

  function resetInput() {
    setIsTimerActive(false);
    setLoading(false);
    setTimer(40);
    setInput("");
    setErrors([]);
    setIsValidInput(false);

    setTimeout(() => {
      setLastUser("");
      setUserAuthenticated(false);
    }, 3000);
  }

  return (
    <>
      <section className="mainSection">
        <Simaskra />

        <div className="audkenni">
          {isTimerActive && <h1 style={{ color: "white" }}>{timer}</h1>}
          <label className="idLabel">Kennitala/Símanúmer:</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="idInput"
            value={input}
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
        <RecentAuths />
      </section>
    </>
  );
}
