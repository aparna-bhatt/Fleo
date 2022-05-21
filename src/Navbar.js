import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useDispatch } from "react-redux";
import { setZoomLevel } from "./features/fleo/fleoSlice";
export default function DenseAppBar() {
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item lg={8}>
              <Typography
                variant="h4"
                color="inherit"
                component="h4"
                fontWeight="bold"
                sx={{ flexGrow: 5 }}
              >
                Tata Analytics
              </Typography>
            </Grid>
            <Grid container item spacing={1} justifyContent="end" lg={4}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    dispatch(setZoomLevel(1));
                  }}
                >
                  <ZoomInIcon color="inherit" />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    dispatch(setZoomLevel(-1));
                  }}
                >
                  <ZoomOutIcon color="inherit" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
