import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

function CreateGroup({ create, manage }) {
  const [open, setOpen] = useState(true);
  const [groupName, setGroupName] = useState("");

  const handleClose = () => {
    setOpen(false);
    manage();
  };
  const handleNewGroup = (e) => {
    e.preventDefault();
    if (groupName) {
      create(groupName);
      manage();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create A New Group"}
        </DialogTitle>
        <DialogContent>
          <form autoComplete="off" onSubmit={handleNewGroup}>
            <TextField
              id="outlined-basic"
              label="Enter Group Name"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={groupName}
              style={{ backgroundColor: "rgb(45 45 73)", borderRadius: "5px" }}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleNewGroup(e);
            }}
            type="submit"
            color="primary"
            autoFocus
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateGroup;
