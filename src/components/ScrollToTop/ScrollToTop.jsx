import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Box sx={{ minHeight: "100vh" }}>{children}</Box>;
};

export default withRouter(ScrollToTop);
