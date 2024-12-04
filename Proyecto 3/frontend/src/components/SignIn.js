import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  styled,
  Alert,
  Fade,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { initializeGoogleAuth, signInWithGoogle } from "./GoogleAuth";

const CLIENT_ID =
  "959635192925-gvg3h3ej8rridlh5jkatitcvfsh95gsg.apps.googleusercontent.com";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  maxWidth: "100% !important",
  margin: 0,
  padding: "0 !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #8B0000 0%, #FF0000 100%)",
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
  "@keyframes gradient": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  width: "100%",
  maxWidth: 1000,
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 40px rgba(139, 0, 0, 0.2)",
}));

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: { xs: "none", md: "block" },
  backgroundImage: `url("/login-background.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  color: "#000000",
  backgroundColor: "#ffffff",
  border: "1px solid #ccc",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    transform: "scale(1.02)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  "& .icon": {
    color: "#DB4437",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: theme.spacing(1),
  transition: "all 0.3s ease",
}));

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializeGoogleAuth(CLIENT_ID).catch((err) => {
      console.error("Failed to initialize Google Sign-In:", err);
      setError("Failed to initialize Google Sign-In. Please refresh and try again.");
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const userData = await signInWithGoogle();
      console.log("User logged in:", userData);

      localStorage.setItem("user", JSON.stringify(userData));
      
      navigate("/lyrics");
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={0}>
        <FormSection>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "black",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            Welcome Back
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <GoogleButton
              startIcon={<FaGoogle className="icon" />}
              fullWidth
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Continue with Google"}
            </GoogleButton>

            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  sx={{ mt: 2 }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              </Fade>
            )}
          </Box>
        </FormSection>
        <ImageSection />
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginPage;
