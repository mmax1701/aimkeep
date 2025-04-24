// components/AimsStats/AimsStats.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { motion } from "framer-motion";

const AimsStats = ({ total, completed }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedCompleted, setAnimatedCompleted] = useState(0);

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Анимация прогресса
  useEffect(() => {
    let frame;
    let start = 0;
    const duration = 500;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const value = Math.min((elapsed / duration) * progress, progress);
      setAnimatedProgress(Math.floor(value));
      if (value < progress) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  // Анимация чисел (total и completed)
  useEffect(() => {
    const animateNumber = (from, to, setNumber) => {
      let start = from;
      const duration = 500;
      const increment = (to - from) / (duration / 16); // 60 FPS

      const animate = () => {
        start += increment;
        if (start >= to) {
          setNumber(to);
        } else {
          setNumber(Math.floor(start));
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateNumber(0, total, setAnimatedTotal);
    animateNumber(0, completed, setAnimatedCompleted);
  }, [total, completed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 2,
          px: 2,
          py: 2,
          mb: 3,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(6px)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <FormatListBulletedIcon sx={{ color: "#64B5F6" }} />
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ textAlign: "left", whiteSpace: "nowrap" }}
            >
              Усього:
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ textAlign: "left" }}
            >
              {animatedTotal}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircleIcon sx={{ color: "#A5D6A7" }} />
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ textAlign: "right", whiteSpace: "nowrap" }}
            >
              Виконано:
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ textAlign: "right" }}
            >
              {animatedCompleted}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={0.5}
            textAlign={isMobile ? "center" : "left"}
          >
            Прогрес: {animatedProgress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={animatedProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#F06292",
              },
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default AimsStats;
