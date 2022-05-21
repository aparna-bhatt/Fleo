import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateData } from "./features/fleo/fleoSlice";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import "./SalesCars.css";

const theme = createTheme({
  palette: {
    success: {
      main: "#31bc38",
    },
    warning: {
      main: "#ff962d",
    },
    error: {
      main: "#ff3c3c",
    },
  },
});

const alertStyle = {
  success: {
    backgroundColor: "#81c78482",
    color: "#388e3c",
  },
  warning: {
    backgroundColor: "#ffb84d80",
    color: "#f57c00",
  },
  error: {
    backgroundColor: "#e5737380",
    color: "#d32f2f",
  },
};

export default function BasicCard({ cardData }) {
  const { attributes, category } = cardData;
  const completed =
    (cardData.attributes.total_sales / cardData.attributes.target_sales) * 100;
  const alertType =
    completed <= 33 ? "error" : completed <= 66 ? "warning" : "success";
  const dispatch = useDispatch();
  const clickHandler = (id, level) => {
    dispatch(updateData({ id, level }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Card
          sx={{ minWidth: 275, fontWeight: "bold" }}
          onClick={() =>
            clickHandler(cardData.attributes.id, cardData.attributes.level)
          }
        >
          <CardContent>
            <Grid container direction="column">
              <Grid container item direction="row">
                <Grid flexGrow={1} item>
                  <Typography
                    fontWeight="bold"
                    gutterBottom
                    marginBottom="3rem"
                  >
                    {category}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="h3">
                    <b>{Math.round(completed)}%</b>{" "}
                    <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                      Complete
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container direction="column" spacing={1}>
                <Grid container item direction="row">
                  <Grid item container direction="column" spacing={0.5} lg="8">
                    <Grid item>Total Sales : {attributes.total_sales}</Grid>
                    <Grid item>Target Sales : {attributes.target_sales}</Grid>
                  </Grid>
                  <Grid item xs="4" lg="4">
                    <Box
                      className="sales-card-alert"
                      sx={{ ...alertStyle[alertType] }}
                    >
                      {alertType === "error" && "At Risk"}
                      {alertType === "warning" && "Off Track"}
                      {alertType === "success" && "On Track"}
                    </Box>
                  </Grid>
                </Grid>
                <Grid item lg="3">
                  <LinearProgress
                    color={alertType}
                    style={{ height: "15px", borderRadius: "10px" }}
                    variant="determinate"
                    value={completed}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </ThemeProvider>
  );
}
