import React from "react";
import Button from "@material-ui/core/Button";

// const useStyles = makeStyles(theme => ({
//     root: {
//         margin: theme.spacing(0.5)
//     },
//     label: {
//         textTransform: 'none'
//     }
// }))

export default function CustomButton(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  //const classes = useStyles();

  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      //classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </Button>
  );
}
