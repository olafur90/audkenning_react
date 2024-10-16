import { useEffect, useState } from "react";
import "./RecentAuths.scss";

export default function RecentAuths({ shouldRefresh }) {
  const [recentAuths, setRecentAuths] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/GetRecentAuthentications`)
      .then((res) => res.json())
      .then((data) => setRecentAuths(data));
  }, [shouldRefresh]);

  return (
    <div
      style={{
        maxHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <h1>Síðustu skráningar</h1>
      <ul style={{ listStyleType: "none", overflow: "auto" }}>
        {recentAuths.map((auth) => (
          <li key={auth.id}>
            <p
              style={{
                backgroundColor: auth.isAuthenticated ? "green" : "red",
                color: "white",
                fontWeight: "bold",
                margin: 0,
                padding: 10,
              }}
            >
              {auth.name}
            </p>
            <p
              style={{
                margin: 0,
              }}
            >
              {new Date(auth.timeOfAuth).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
