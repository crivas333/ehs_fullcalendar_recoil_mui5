import React, { useState, Fragment } from "react";

//import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
//import { GlobalContext } from "../../context/GlobalState";
import ApplicationFieldsTable from "./ApplicationFieldsTable";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import { getEncounterFieldsCollection } from "../../services/configService";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
// }));
const initialFormState = {
  id: null,
  fieldView: "",
  fieldType: "",
  fieldData: "",
};
//export default function Appointment () {
export default function EncounterControlCfg(props) {
  //const classes = useStyles();

  // Setting state
  const [chosenField, setChosenField] = useState("Tipo de Visita");
  const [fieldType, setFieldType] = useState("encounterType");

  const [editingArray, setEditingArray] = useState(initialFormState);
  const [editingFlag, setEditingFlag] = useState(false);
  const { applicationFields, addField, updateField, deleteField } = props;

  const onViewFieldChange = (event) => {
    //console.log('SystemConfig: ',event.target.value)
    setChosenField(event.target.value);
    switch (event.target.value) {
      case "Tipo de Visita":
        setFieldType("encounterType");
        break;
      case "Estado":
        setFieldType("encounterStatus");
        break;
      case "Tipo de Paciente":
        setFieldType("patientType");
        break;
      case "Tipo de Atención":
        setFieldType("serviceType");
        break;
      case "Sensibilidad":
        setFieldType("sensibility");
        break;
      case "Paquete de Servicios":
        setFieldType("serviceBundle");
        break;
      case "Médico":
        setFieldType("healthProf");
        break;
      case "Centro":
        setFieldType("facility");
        break;
      default:
    }
  };

  // CRUD operations
  const addFieldData = (addedFieldData) => {
    //console.log('customControl1: ',addedFieldData)
    const fd = addedFieldData.toUpperCase();
    const data = {
      fieldView: "encounterView",
      fieldType: fieldType,
      fieldData: fd,
    };
    addField.mutate(data);
  };
  const updateFieldData = (updatedValue) => {
    setEditingFlag(false);
    //console.log('updatedField: ',updatedField)
    const fd = updatedValue.toUpperCase();
    const data = { ...editingArray, fieldData: fd };
    //updateApplicationFieldAPOLLO(data);
    updateField.mutate({ id: data.id, fieldData: data.fieldData });
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
  //appFields={ applicationFields.filter(item => item.fieldType ===fieldType)}
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReusableControls.CustomSelect
          name="cfgCustData"
          label="Conf. de Consulta"
          value={chosenField}
          onChange={onViewFieldChange}
          options={getEncounterFieldsCollection()}
          //error={errors.sex}
        />
      </Grid>

      <Grid item>
        <ApplicationFieldsTable
          appFields={applicationFields.filter(
            (item) =>
              item.fieldView === "encounterView" && item.fieldType === fieldType
          )}
          editRow={editRow}
          deleteUser={deleteFieldData}
        />
      </Grid>
      <Grid item>
        {editingFlag ? (
          <Fragment>
            <EditForm
              //editing={editingFlag}
              setEditingFlag={setEditingFlag}
              editingValue={editingArray.fieldData}
              updateField={updateFieldData}
            />
          </Fragment>
        ) : (
          <Fragment>
            <AddForm addField={addFieldData} />
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
}

/*
<div //className={classes.root}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReusableControls.CustomSelect
            name="cfgCustData"
            label="Conf. de Consulta"
            value={chosenField}
            onChange={onViewFieldChange}
            options={getEncounterFieldsCollection()}
            //error={errors.sex}
          />
        </Grid>

        <Grid item>
          <ApplicationFieldsTable
            appFields={applicationFields.filter(
              (item) =>
                item.fieldView === "encounterView" &&
                item.fieldType === fieldType
            )}
            editRow={editRow}
            deleteUser={deleteFieldData}
          />
        </Grid>
        <Grid item>
          {editingFlag ? (
            <Fragment>
              <EditForm
                //editing={editingFlag}
                setEditingFlag={setEditingFlag}
                editingValue={editingArray.fieldData}
                updateField={updateFieldData}
              />
            </Fragment>
          ) : (
            <Fragment>
              <AddForm addField={addFieldData} />
            </Fragment>
          )}
        </Grid>
      </Grid>
    </div>

*/

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
