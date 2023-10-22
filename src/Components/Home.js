import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    paddingBottom: "25px",
    color: "#f0f0f0",
  },
  heading: {
    fontSize: "2.2em",
    fontWeight: "700",
  },
  subHeading: {
    fontSize: "1.6em",
  },
  groupDiv: {
    padding: "15px",
  },
  groupContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "20px",
    alignItems: "center",
  },
  square: {
    height: "80px",
    width: "80px",
    backgroundColor: "#8fabbd66",
    fontSize: "2rem",
  },
  rootGroup: {
    height: "calc(100vh - 185px)",
    position: "relative",
    padding: "15px",
    overflowY: "scroll",
  },
  groupText: {
    paddingTop: "10px",
    fontSize: "1.2rem",
  },
  groupCard: {
    backgroundColor: "#1e2439",
    boxShadow:
      "0px 3px 4px -1px rgb(0 0 0 / 17%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    color: "rgb(220, 221, 222)",
  },
}));

function Home() {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("groups")
      .orderBy("groupName", "asc")
      .onSnapshot((snapshot) => {
        setGroups(
          snapshot.docs.map((group) => ({
            groupName: group.data().groupName,
            id: group.id,
          }))
        );
      });
  }, []);

  const goToGroup = (id) => {
    history.push(`/group/${id}`);
  };

  return (
    <div style={{ backgroundColor: "rgb(34 39 59)" }}>
      <Grid container className={classes.root}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography component="h1" className={classes.heading}>
            Welcome to ChatNova
          </Typography>
          <Typography component="h1" className={classes.subHeading}>
            Live chat using Firebase!
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.rootGroup}>
        {groups.map((group) => (
          <Grid
            item
            xs={6}
            md={3}
            className={classes.groupDiv}
            key={group.id}
          >
            <Card className={classes.groupCard}>
              <CardActionArea
                style={{ display: "flex" }}
                onClick={() => goToGroup(group.id)}
              >
                <CardContent className={classes.groupContent} >
                  <Avatar
                    variant="square"
                    className={classes.square}
                    style={{ backgroundColor: "#6a9ec066" }}
                  >
                    {group.groupName.substr(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography className={classes.groupText}>
                    {group.groupName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
