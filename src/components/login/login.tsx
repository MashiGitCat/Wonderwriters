import { useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import "../../styles/variables.css";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://wonder-writers-server.onrender.com/api/users/login"
        : "http://localhost:8080/api/users/login";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else {
          console.log("Logged in successfully");
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          console.log("Username stored in localStorage:", data.username);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Login failed");
      });
  };
  return (
    <div className="login">
      <Container maxWidth="xs" className="login__card">
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="login__heading">Login</h2>
          <img
            src="https://res.cloudinary.com/dchzjr4bz/image/upload/v1705883014/login_lbso0i.png"
            alt="Login"
            className="login__image"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email-input"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password-input"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />

          <Button
            className="login__signin-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOGIN
          </Button>
          <div className="login__register-text-container">
            <p className="login__password-reset-text">Forgot Password?</p>
            <p className="login__password-reset-text">
              Not a Member Yet?{" "}
              <Link to="/signup" className="login__password-reset-text">
                Register
              </Link>
            </p>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
