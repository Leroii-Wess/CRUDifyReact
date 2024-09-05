/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

function User({ user, onDelete, onEdit }) {
  const { avatar, email, first_name: firstName, id } = user;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(firstName);

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit(id, name);
  };

  return (
    <Container>
      <DeleteButton onClick={() => onDelete(id)}>x</DeleteButton>
      <div>
        <img src={avatar} />
      </div>
      <InfoContainer onSubmit={handleSubmit}>
        <p>
          <Title>Name:</Title>{" "}
          {edit ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <span>{firstName}</span>
          )}
        </p>
        <p>
          <Title>Email:</Title> {email}
        </p>
        <ButtonContainer>
          <span>
            <Button edit={edit} onClick={() => setEdit((e) => !e)}>
              {edit ? "Save" : "Edit Name"}
            </Button>
          </span>
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
}

export default User;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  gap: 1rem;
  border-radius: 5px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const InfoContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  border-radius: 5px;
  background-color: ${(props) => (props.edit ? `dodgerblue` : `#C4C4C4`)};
  color: ${(props) => (props.edit ? `#fff` : `#0b0b0b`)};

  &:hover {
    background-color: ${(props) => (props.edit ? `#74c0fc` : `#dee2e6`)};
    color: ${(props) => (props.edit ? `#fff` : `#0b0b0b`)};
  }
`;

const DeleteButton = styled.button`
  background-color: #f03e3e;
  border: none;
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
  position: absolute;
  top: 4%;
  right: 2%;
  color: #fff;

  &:hover {
    background-color: #e03131;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const Title = styled.span`
  font-weight: 500;
`;
