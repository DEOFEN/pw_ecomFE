import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {

  const navigate = useNavigate();

  const [phoneno, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let payload = {
      phoneno: phoneno,
      password: password
    }

    if(phoneno !== "" || password !== ""){
      axios.post("http://localhost:3001/ecom/login", payload)
      .then((res) => {
           if(res.data.statusCode === 200){
             window.alert("Login Successfull");
             navigate('/home')
           }
      })
      .catch((error) => {
        console.log(error)
      })
     
    }
  }


  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleLogin}>
          <Input value={phoneno} onChange={(e) => {setPhone(e.target.value)}} required placeholder="phoneno" />
          <Input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" required placeholder="password" />
          <Button type="submit">LOGIN</Button>
          <button onClick={() => { navigate("/signup") }}>CREATE A NEW ACCOUNT</button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
