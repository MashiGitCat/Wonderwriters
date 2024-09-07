import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  TextField,
  Container,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

interface ICountry {
  name: string;
  code: string;
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [country, setCountry] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.first.org/data/v1/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const countryNames: ICountry[] = Object.values(data.data).map(
          (country: any) => ({
            name: country.country,
            code: country["country-code"],
          })
        );
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://wonder-writers-server.onrender.com/api/users/register"
        : "http://localhost:8080/api/users/register";

    const userData = {
      username,
      email,
      password,
      birthDate,
      country,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      alert(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to register: ${(error as Error).message}`);
    }
  };

  return (
    <div className="signup">
      <Container component="main" maxWidth="xs" className="signup__card">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="signup__heading">SignUp</h2>
          <img
            src="https://res.cloudinary.com/dchzjr4bz/image/upload/v1706047443/signup-1_yy3zxy.png"
            alt="Logo"
            className="signup__image"
          />
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="signup__textfields"
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="signup__textfields"
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="signup__textfields"
              error={passwordError}
              helperText={
                passwordError
                  ? "Passwords do not match or are not complex enough"
                  : ""
              }
              variant="standard"
            />

            <FormControl
              fullWidth
              margin="normal"
              className="signup__textfields"
            >
              <DatePicker
                views={["year", "month", "day"]}
                label="Birthday*"
                value={birthDate}
                onChange={(newValue: Date | null) => {
                  setBirthDate(newValue);
                }}
              />
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              className="signup__textfields"
            >
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                variant="standard"
                id="country"
                value={country}
                label="Country"
                onChange={(e) => setCountry(e.target.value as string)}
                className="signup__textfields"
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="signup__textfields"
              variant="standard"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="signup__sign-in-button"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>
          </form>
          <p className="signup__password-reset-text">
            Already have an account?
            <Link to="/login" className="signup__password-reset-text">
              {" "}
              Login
            </Link>
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
