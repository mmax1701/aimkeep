import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BeenhereIcon from "@mui/icons-material/Beenhere";

const Header = ({ user, onSignOut }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 2,
        px: 2,
        py: 2,
        mb: 3,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(6px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        {/* Логотип и название */}
        <Box display="flex" alignItems="center" gap={1}>
          <BeenhereIcon
            fontSize={isMobile ? "small" : "medium"}
            sx={{ color: "#036aff" }}
          />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h1"
            fontWeight={500}
          >
            AimKeep
          </Typography>
        </Box>

        {/* Аватар, имя и кнопка выхода */}
        <Box display="flex" alignItems="center" gap={1}>
          {user.photoURL && (
            <Avatar
              alt="avatar"
              src={user.photoURL}
              sx={{ width: 28, height: 28 }}
            />
          )}
          <Typography variant="body2" fontWeight={500}>
            {user.displayName}
          </Typography>
          <Button
            onClick={onSignOut}
            size="small"
            sx={{
              textTransform: "none",
              fontSize: "0.75rem",
              padding: "2px 5px",
              minWidth: "unset",
              color: "#036aff",
            }}
            variant="outlined"
            // startIcon={<LogoutIcon fontSize="small" />}
          >
            Вийти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
