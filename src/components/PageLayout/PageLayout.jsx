import { Container, Box } from "@mui/material";

const PageLayout = ({ children }) => {
  return (
    <Box
    sx={{
        minHeight: "100vh",
        background: "linear-gradient(to top right, rgba(0, 191, 255, 0.16), rgba(255, 132, 204, 0.3))",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          width: "100%",
        //   backgroundColor: "#ffffff", // белый фон контента
        //   borderRadius: 3, // скругление углов
        //   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // мягкая тень
          padding: { xs: 2, sm: 4 },
          marginTop: { xs: 2, sm: 6 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageLayout;
