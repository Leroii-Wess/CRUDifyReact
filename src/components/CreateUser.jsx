/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import { basicSchema } from "../schema";

function CreateUser({ onCreate }) {
  const { values, handleChange, touched, handleBlur, handleSubmit, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  function onSubmit(values, actions) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    const user = {
      avatar: `https://reqres.in/img/faces/${randomNumber}-image.jpg`,
      first_name: values.name,
      email: values.email,
    };

    onCreate(user);
    actions.resetForm();
  }

  return (
    <InputContainer>
      <StyledForm onSubmit={handleSubmit}>
        <SingleInput>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.name && touched?.name}
          />
          {errors?.name && touched?.name && <Error>{errors.name}</Error>}
        </SingleInput>
        <SingleInput>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.email && touched?.email}
          />
          {errors?.email && touched?.email && <Error>{errors.email}</Error>}
        </SingleInput>
        <div>
          <Button type="submit">Create User</Button>
        </div>
      </StyledForm>
    </InputContainer>
  );
}

export default CreateUser;

const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 7px;
  border: 1px solid #999;
  margin-bottom: 0.5rem;

  border: ${(props) =>
    props.errors ? "2px solid #ff8787;" : "2px solid #999"};
`;

const SingleInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  font-size: 1rem;
  color: #ff8787;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: dodgerblue;

  /* background-color: ${(props) => (props.primary ? "green" : "dodgerblue")};
  color: ${(props) => (props.primary ? "white" : "#f9f9f9")}; */
`;
