import React from "react";
// import { Link as RouterLink } from 'react-router-dom';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/styles';
//import {makeStyles} from "@material-ui/core/styles";
import { makeStyles } from "@mui/styles";
// import { Avatar, Typography } from '@material-ui/core';
// import { Typography } from '@material-ui/core/Typography';
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 40,
    height: 40,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "Hever Mallaupoma",
    avatar: "/images/avatars/avatar_11.png",
    bio: "Brain Director",
  };

  return (
    <div
      {...rest}
      //className={clsx(classes.root, className)}
    >
      <Typography className={classes.name} variant="h5">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

// Profile.propTypes = {
//   className: PropTypes.string
// };

export default Profile;
/*
 <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
*/
