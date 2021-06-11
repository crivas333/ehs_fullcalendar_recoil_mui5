import React from "react";
//import { QueryClient } from "react-query";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
import * as encounterService from "../../services/configService";
//import { GlobalContext } from "../../context/GlobalState";

const initialFValues = {
  id: 0,
  encounterDate: new Date(),
  encounterType: "CONSULTA",
  patientType: "NUEVO",
  serviceType: "AMBULATORIA",
  sensibility: "NORMAL",
  serviceBundle: "PAQUETE#1",
};

export default function Encounter(props) {
  //const { applicationFields } = useContext(GlobalContext);
  const { applicationFields } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    //setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useReusableForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //employeeService.insertEmployee(values)
      resetForm();
    }
  };
  //<Grid container>
  return (
    <ReusableForm onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", direction: "row" }}>
            <ReusableControls.PlainDatePicker
              inputVariant="outlined"
              name="encounterDate"
              label="Fecha de Consulta"
              value={values.encounterDate}
              onChange={handleInputChange}
            />
            <ReusableControls.CustomSelect
              variant="outlined"
              name="encounterType"
              label="Tipo de Consulta"
              value={values.encounterType}
              onChange={handleInputChange}
              options={encounterService.getFieldsDataCollection(
                applicationFields,
                "encounterView",
                "encounterType"
              )}
              error={errors.encounterType}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", direction: "row" }}>
            <ReusableControls.CustomSelect
              variant="outlined"
              name="encounterStatus"
              label="Estado"
              //value={values.departmentId}
              value={values.encounterStatus || ""}
              onChange={handleInputChange}
              options={applicationFields
                .filter((item) => item.fieldType === "encounterStatus")
                .map((item) => ({
                  id: item.id,
                  field: item.fieldData,
                }))}
              error={errors.serviceType}
            />
            <ReusableControls.CustomSelect
              variant="outlined"
              name="serviceBundle"
              label="Paquetes de Servicio"
              value={values.serviceBundle || ""}
              onChange={handleInputChange}
              //options={employeeService.getDepartmentCollection()}
              options={applicationFields
                .filter((item) => item.fieldType === "serviceBundle")
                .map((item) => ({
                  id: item.id,
                  field: item.fieldData,
                }))}
              error={errors.servicesBundle}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box sx={{ display: "flex", direction: "row" }}>
            <ReusableControls.CustomSelect
              variant="outlined"
              name="healthProf"
              label="Médico"
              //value={values.departmentId}
              value={values.healthProf || ""}
              onChange={handleInputChange}
              options={applicationFields
                .filter((item) => item.fieldType === "healthProf")
                .map((item) => ({
                  id: item.id,
                  field: item.fieldData,
                }))}
              error={errors.serviceType}
            />
            <ReusableControls.CustomSelect
              variant="outlined"
              name="facility"
              label="Centro"
              value={values.facility || ""}
              onChange={handleInputChange}
              //options={employeeService.getDepartmentCollection()}
              options={applicationFields
                .filter((item) => item.fieldType === "facility")
                .map((item) => ({
                  id: item.id,
                  field: item.fieldData,
                }))}
              error={errors.servicesBundle}
            />
          </Box>
        </Grid>
      </Grid>
    </ReusableForm>
  );
}

/*
     <ReusableControls.Button type="submit" text="Submit" />
            <ReusableControls.Button
              text="Reset"
              color="default"
              onClick={resetForm}
            />
*/
