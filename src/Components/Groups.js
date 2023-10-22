import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import CreateGroup from "./CreateGroup";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#cb43fc",
  },
  primary: {
    color: "#cb43fc",
  },
}));

function Groups() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [groupList, setGroupList] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    db.collection("groups")
      .orderBy("groupName", "asc")
      .onSnapshot((snapshot) => {
        setGroupList(
          snapshot.docs.map((group) => ({
            groupName: group.data().groupName,
            id: group.id,
          }))
        );
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToGroup = (id) => {
    history.push(`/group/${id}`);
  };

  const manageCreateGroupModal = () => {
    setShowCreateGroup(!showCreateGroup);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const addGroup = (gName) => {
    if (gName) {
      gName = gName.toLowerCase().trim();
      if (gName === "") {
        handleAlert();
        return;
      }

      for (var i = 0; i < groupList.length; i++) {
        if (gName === groupList[i].groupName) {
          handleAlert();
          return;
        }
      }

      db.collection("groups")
        .add({ groupName: gName.toLowerCase() })
        .then((res) => {
          console.log("added new group");
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        TransitionComponent={Fade}
        message="Group Name Already Exits!!"
        key={Fade}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
            <CloseIcon />
          </IconButton>
        }
      />

      {showCreateGroup ? (
        <CreateGroup create={addGroup} manage={manageCreateGroupModal} />
      ) : null}
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText primary="Create New Group" />
        <IconButton edge="end" aria-label="add" onClick={manageCreateGroupModal}>
          <AddIcon className={classes.primary} />
        </IconButton>
      </ListItem>
      <Divider />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IoMdChatboxes className={classes.iconDesign} />
          </ListItemIcon>
          <ListItemText primary="GROUPS" style={{ color: "#8e9297" }} />
          {open ? (
            <ExpandLess className={classes.primary} />
          ) : (
            <ExpandMore className={classes.primary} />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {groupList.map((group) => (
              <ListItem
                key={group.id}
                button
                className={classes.nested}
                onClick={() => goToGroup(group.id)}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <HiOutlineUserGroup
                    className={classes.iconDesign}
                    style={{ color: "#b9bbbe" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    group.groupName === group.groupName.substr(0, 12)
                      ? group.groupName
                      : `${group.groupName.substr(0, 12)}...`
                  }
                  style={{ color: "#dcddde" }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Groups;
