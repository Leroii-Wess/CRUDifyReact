import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import User from "./components/User";
import CreateUser from "./components/CreateUser";
import { LoadingSpinner } from "./components/LoadingSpinner";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // GET
  const fetchData = async () => {
    try {
      setIsLoading(true);
      await delay(1500);

      const res = await axios.get("https://reqres.in/api/users");

      setUsersData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE
  const handleCreateUser = async (user) => {
    try {
      const res = await axios.post("https://reqres.in/api/users", user);
      const updatedUser = [...usersData, { ...res.data }];
      setUsersData(updatedUser);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);

      const updatedUsers = usersData.filter((user) => user.id !== id);

      setUsersData(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  //UPDATE
  const handleUpdateName = async (id, name) => {
    try {
      const res = await axios.put(`https://reqres.in/api/users/${id}`);
      console.log(res);

      const updatedUsername = usersData.map((user) => {
        if (user.id === id) {
          return { ...user, first_name: name };
        }

        return user;
      });

      setUsersData(updatedUsername);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppDiv>
      <div>
        <Button onClick={fetchData}>Get Data</Button>
      </div>
      <CreateUser onCreate={handleCreateUser} />

      <UsersContainer>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {usersData.map((user) => (
              <User
                user={user}
                key={user.id}
                onDelete={handleDeleteUser}
                onEdit={handleUpdateName}
              />
            ))}
          </>
        )}
      </UsersContainer>
    </AppDiv>
  );
}

export default App;

const AppDiv = styled.div`
  width: 80%;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #63e6be;
`;

const UsersContainer = styled.div`
  width: 50%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* align-items: center; */
  justify-content: center;
`;
