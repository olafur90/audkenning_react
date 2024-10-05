import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";

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
      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShtbOdpffz_X9kFdtNynlcyItAwvaCR3sB5g&s" />
      <div
        style={{
          textAlign: "center",
          marginTop: 200,
          border: "1px solid black",
          padding: 10,
          backgroundColor: "purple",
        }}
      >
        <label>Kennitala/Símanúmer:</label>
        <input type="text" style={{ marginLeft: 10, marginRight: 10 }} />
        <button onClick={fetchUser}>Submit</button>
        <h1>{userAuthenticated && "Samþykkt"}</h1>
      </div>
      {loading && (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      )}
      <Image src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474387pea/anh-meme-tien-ba-dao_093839638.jpg" />
    </>
  );
}
