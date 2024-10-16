import "./Simaskra.scss";
import { useEffect, useState } from "react";

export default function Simaskra({ onNumberSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("simaskra.csv")
      .then((response) => response.text())
      .then((csv) => {
        const lines = csv.split("\n");
        const headers = lines[0]
          .split(",")
          .map((header) => header.replace(/"/g, "").trim());
        const users = lines.slice(1).map((line) => {
          const values = line.split(",");
          const user = {};
          for (let i = 0; i < headers.length; i++) {
            let value = values[i]
              ? values[i].replace(/"/g, "").trim().replace("+354", "") // Assuming you want to remove +354
              : "";

            // Format the telephonenumber if it has 7 digits
            if (headers[i] === "telephonenumber" && value.length === 7) {
              value = value.slice(0, 3) + "-" + value.slice(3);
            }

            user[headers[i]] = value;
          }
          return user;
        });

        // Process users: Remove "RB" prefix
        users.forEach((user) => {
          if (user.Name.startsWith("RB")) {
            user.Name = user.Name.slice(3);
          } else {
            users.splice(users.indexOf(user), 1);
          }
        });

        // Sort by name
        users.sort((a, b) => a.Name.localeCompare(b.Name));
        setUsers(users);
      });
  }, []);

  const handleNumberClick = (number) => {
    onNumberSelect(number);
  };

  return (
    <div className="simaskra-container">
      <h1>Símaskrá</h1>
      <ul className="simaskra-list">
        {users.map((user, index) => (
          <li key={user.id || index}>
            {user.Name} -{" "}
            <span onClick={() => handleNumberClick(user.telephonenumber)}>
              {user.telephonenumber}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
