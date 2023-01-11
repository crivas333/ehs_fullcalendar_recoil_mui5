import React from "react";
import {
  //RecoilRoot,
  //atom,
  //selector,
  useRecoilState,
  //useRecoilValue,
  //useSetRecoilState,
} from "recoil";
import AddEventDialogAppo from "./AddEventDialog";
import clsx from "clsx";
//import DeleteIcon from "@material-ui/icons/Delete";
import GlobalFilter from "./GlobalFilter";
//import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@mui/styles";
import { lighten } from "@mui/material/styles/";
//import PropTypes from 'prop-types'
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

//import DatePicker from "@material-ui/lab/DatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { searchDateState } from "../../context/RecoilStore";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          //backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          backgroundColor: lighten(theme.palette.secondary.light, 0.75),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const TableToolbar = (props) => {
  //const classes = useToolbarStyles();
  const [searchDate, setSearchDate] = useRecoilState(searchDateState);
  //const [value, setValue] = React.useState(new Date().toISOString());
  const {
    //numSelected,
    addEventHandler,
    //deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = props;

  const onChange = (val) => {
    console.log(val);
    //console.log(val.target.value);
    //setValue(val);
    setSearchDate(val);
  };
  return (
    <Toolbar
    //className={clsx(classes.root, {
    //[classes.highlight]: numSelected > 0,
    //[classes.highlight]: false,
    //})}
    >
      <AddEventDialogAppo addEventHandler={addEventHandler} />
      <Typography
        //className={classes.title}
        variant="h6"
        id="tableTitle"
      >
        Nueva Cita
      </Typography>
      <DatePicker
        renderInput={(props) => (
          <TextField
            {...props}
            variant="standard"
            margin="dense"
            size="small"
            label="Fecha de Búsqueda"
            fullWidth
            helperText={null}
          />
        )}
        allowSameDateSelection={true}
        //readOnly={true}
        autoOk={true}
        showTodayButton
        todayText="hoy"
        value={searchDate}
        //onChange={(val) => setValue(val)}
        onChange={onChange}
        minDate={new Date("1900-01-01")}
        //disableFuture={disableFuture}
        //disablePast={disablePast}
        //readOnly={readOnly}
        onError={console.log}
      />
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

export default TableToolbar;

/*
const TableToolbar = (props) => {
  //const classes = useToolbarStyles();
  const [searchDate, setSearchDate] = useRecoilState(searchDateState);
  //const [value, setValue] = React.useState(new Date().toISOString());
  const {
    //numSelected,
    addEventHandler,
    //deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = props;

  const onChange = (val) => {
    console.log(val);
    //console.log(val.target.value);
    //setValue(val);
    setSearchDate(val);
  };
  return (
    <Toolbar
      
      className={clsx(classes.root, {
        //[classes.highlight]: numSelected > 0,
        [classes.highlight]: false,
      })}
      
    >
      <AddEventDialogAppo addEventHandler={addEventHandler} />
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Nueva Cita
      </Typography>
      <DatePicker
        renderInput={(props) => (
          <TextField
            {...props}
            variant="standard"
            margin="dense"
            size="small"
            label="Fecha de Búsqueda"
            fullWidth
            helperText={null}
          />
        )}
        allowSameDateSelection={true}
        //readOnly={true}
        autoOk={true}
        showTodayButton
        todayText="hoy"
        value={searchDate}
        //onChange={(val) => setValue(val)}
        onChange={onChange}
        minDate={new Date("1900-01-01")}
        //disableFuture={disableFuture}
        //disablePast={disablePast}
        //readOnly={readOnly}
        onError={console.log}
      />
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

export default TableToolbar;

*/
