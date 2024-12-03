import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  styled,
  Alert,
  Fade
} from "@mui/material";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

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
    "0%": {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%"
    },
    "100%": {
      backgroundPosition: "0% 50%"
    }
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  width: "100%",
  maxWidth: 1000,
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 40px rgba(139, 0, 0, 0.2)"
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
    zIndex: 1
  }
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
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  "& .icon": {
    color: "#DB4437"
  },
  "&:active": {
    transform: "scale(0.98)"
  },
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: theme.spacing(1),
  transition: "all 0.3s ease",
}));

const GithubButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  color: "#ffffff",
  backgroundColor: "#24292e",
  "&:hover": {
    backgroundColor: "#1b1f23",
    transform: "scale(1.02)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
  },
  "&:active": {
    transform: "scale(0.98)"
  },
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: theme.spacing(1),
  transition: "all 0.3s ease"
}));

const FacebookButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  color: "#ffffff",
  backgroundColor: "#1877f2",
  "&:hover": {
    backgroundColor: "#166fe5",
    transform: "scale(1.02)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(24, 119, 242, 0.2)"
  },
  "&:active": {
    transform: "scale(0.98)"
  },
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: theme.spacing(1),
  transition: "all 0.3s ease"
}));

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    google: false,
    github: false,
    facebook: false
  });

  const handleLogin = async (provider) => {
    try {
      setError("");
      setLoading(prev => ({ ...prev, [provider]: true }));

      await new Promise(resolve => setTimeout(resolve, 1500));

      if (Math.random() > 0.5) {
        throw new Error(`${provider} login failed. Please try again.`);
      }

      console.log(`Successfully logged in with ${provider}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
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
              marginBottom: 4
            }}
          >
            Welcome Back
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <GoogleButton 
              startIcon={<FaGoogle className="icon" />} 
              fullWidth
              onClick={() => handleLogin("google")}
              disabled={loading.google}
            >
              {loading.google ? "Connecting..." : "Continue with Google"}
            </GoogleButton>
            <GithubButton 
              startIcon={<FaGithub />} 
              fullWidth
              onClick={() => handleLogin("github")}
              disabled={loading.github}
            >
              {loading.github ? "Connecting..." : "Continue with GitHub"}
            </GithubButton>
            <FacebookButton 
              startIcon={<FaFacebook />} 
              fullWidth
              onClick={() => handleLogin("facebook")}
              disabled={loading.facebook}
            >
              {loading.facebook ? "Connecting..." : "Continue with Facebook"}
            </FacebookButton>

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