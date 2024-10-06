import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Audkenni.scss";
import { Button } from "react-bootstrap";

export default function Audkenni() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    setLoading(true);

    const res = await fetch(
      "http://localhost:5177/Home/AuthenticateUser?userIdentifier=1505902649",
      {
        method: "POST",
      }
    );
    setUserAuthenticated((await res.status) === 200);
    setLoading(false);
  }

  return (
    <>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          height: "80vh"
        }}
      >
        <div style={{ border: "1px solid black", display: "flex", justifyContent: "center", padding: 100, margin: 0, marginTop: 50, alignItems: "center", flexDirection: "column", width: 300 }}>
          <label>Kennitala/Símanúmer:</label>
          <input type="text" style={{ marginLeft: 10, marginRight: 10 }} />
          <Button onClick={fetchUser} variant="custom" className="btn-custom">Senda</Button>
          <h1>{userAuthenticated && "Samþykkt"}</h1>
        </div>
      </div>
      {loading && (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      )}
    </>
  );
}
