import { Col, Container, Row } from "react-bootstrap";
import "./Simaskra.scss";
import { useEffect, useState } from "react";

export default function Simaskra({ onNumberSelect }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchString, setSearchString] = useState("");

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

            if (headers[i] === "Name" && value.startsWith("RB ")) {
              value = value.replace("RB ", "");
            }

            user[headers[i]] = value;
          }
          return user;
        });

        // Sort by name
        users.sort((a, b) => a.Name.localeCompare(b.Name));
        setUsers(users);
      });
  }, []);

  // Grabs the clicked number
  const handleNumberClick = (number) => {
    onNumberSelect(number);
  };

  const handleSearch = (searchString) => {
    setSearchString(searchString);
    const filtered = users.filter((user) =>
      user.Name.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredUsers(filtered);
    console.log(filteredUsers);
  };

  return (
    <Container>
      <Row>
        <Col>
          <PhoneSearch onHandleSearch={handleSearch} />
        </Col>
        <Col>
          <SimaskraList users={users} handleNumberClick={handleNumberClick} />
        </Col>
      </Row>
    </Container>
  );
}

/**
 * @description A list of users that are in the simaskra
 * @param {*} users the list of users
 * @param {*} handleNumberClick a function that is called when a number is clicked 
 * @returns a list of users that are in the simaskra
 */
function SimaskraList({ users, handleNumberClick }) {
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

function PhoneSearch({ onHandleSearch }) {
  return (
    <div>
      <h2>Leita að notanda</h2>
      <input
        type="text"
        placeholder="Leita að notanda"
        onChange={(e) => onHandleSearch(e.target.value)}
      />
    </div>
  );
}