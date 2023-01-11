import React from "react";

// import { Avatar, Typography } from '@material-ui/core';

import Typography from "@mui/material/Typography";

const Profile = (props) => {
  //const { className, ...rest } = props;

  const user = {
    name: "Hever Mallaupoma",
    avatar: "/images/avatars/avatar_11.png",
    bio: "Brain Director",
  };

  return (
    <div
    //{...rest}
    //className={clsx(classes.root, className)}
    >
      <Typography variant="h5">{user.name}</Typography>
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
