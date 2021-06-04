import React, { useState } from "react";
//import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import { GlobalContext } from "../../context/GlobalState";
import ApplicationFieldsTable from "./ApplicationFieldsTable";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import { getAppointmentFieldsCollection } from "../../services/configService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
const initialFormState = {
  id: null,
  fieldView: "",
  fieldType: "",
  fieldData: "",
};
//export default function Appointment () {
export default function AppointmentControlCfg(props) {
  const classes = useStyles();
  //const { customData } = useContext(GlobalContext)
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const {
  //   //applicationFields,
  //   //addApplicationFieldAPOLLO,
  //   updateApplicationFieldAPOLLO,
  //   deleteApplicationFieldAPOLLO,
  // } = useContext(GlobalContext);

  // Setting state
  const [chosenField, setChosenField] = useState("Tipo de Cita");
  const [fieldType, setFieldType] = useState("appointmentType");

  const [editingArray, setEditingArray] = useState(initialFormState);
  const [editingFlag, setEditingFlag] = useState(false);
  const { applicationFields, addField, updateField, deleteField } = props;

  const onViewFieldChange = (event) => {
    //console.log('SystemConfig: ',event.target.value)
    setChosenField(event.target.value);
    switch (event.target.value) {
      case "Tipo de Cita":
        setFieldType("appointmentType");
        break;
      case "Estado de Cita":
        setFieldType("appointmentStatus");
        break;

      default:
    }
  };

  // CRUD operations
  const addFieldData = (addedFieldData) => {
    //console.log('customControl1: ',addedFieldData)
    const fd = addedFieldData.toUpperCase();
    const data = {
      fieldView: "appointmentView",
      fieldType: fieldType,
      fieldData: fd,
    };
    //addApplicationFieldAPOLLO(data);
    addField.mutate(data);
  };
  const updateFieldData = (updatedValue) => {
    setEditingFlag(false);
    //console.log("editingArray: ", editingArray);
    const fd = updatedValue.toUpperCase();
    const data = { ...editingArray, fieldData: fd };
    //updateApplicationFieldAPOLLO(data);
    //console.log("data: ", data);
    updateField.mutate({ id: data.id, fieldData: data.fieldData });
    //updateField.mutate(data);
  };
  const deleteFieldData = (id) => {
    setEditingFlag(false);
    //console.log(id)
    //deleteApplicationFieldAPOLLO(id);
    deleteField.mutate({ id: id });
  };

  const editRow = (data) => {
    setEditingFlag(true);
    setEditingArray({
      id: data.id,
      fieldView: data.fieldView,
      fieldType: data.fieldType,
      fieldData: data.fieldData,
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReusableControls.CustomSelect
            name="cfgCustData"
            label="Configuración de Campos de Citas"
            value={chosenField}
            onChange={onViewFieldChange}
            options={getAppointmentFieldsCollection()}
            //error={errors.sex}
          />
        </Grid>

        <Grid item>
          <ApplicationFieldsTable
            appFields={applicationFields.filter(
              (item) =>
                item.fieldView === "appointmentView" &&
                item.fieldType === fieldType
            )}
            editRow={editRow}
            deleteUser={deleteFieldData}
          />
        </Grid>
        <Grid item>
          {editingFlag ? (
            <>
              <EditForm
                //editing={editingFlag}
                setEditingFlag={setEditingFlag}
                editingValue={editingArray.fieldData}
                updateField={updateFieldData}
              />
            </>
          ) : (
            <>
              <AddForm addField={addFieldData} />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

/*
return (
    <div className={classes.root}>
			<Typography variant="h5">
				{props.title}
			</Typography>
			<Grid container spacing={3}>
				<Grid item >
					{editing ? (
						<Fragment>
							<Typography variant="h6">
								Editar Campo
							</Typography>
							<EditForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateFieldData}
							/>
						</Fragment>
					) : (
						<Fragment>
							<Typography variant="h6">
								Actualizar Campo
							</Typography>
							<AddForm addUser={addFieldData} />
						</Fragment>
					)}
				</Grid>
				<Grid item >
					<Typography variant="h6">
						Lista de Campos
					</Typography>
					<ApplicationFieldsTable users={props.dataSource} editRow={editRow} deleteUser={deleteFieldData} />
				</Grid>
			</Grid>
   </div>
  )
*/
