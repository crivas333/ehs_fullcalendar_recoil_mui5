import React, { useContext } from 'react'
import { Grid, } from '@material-ui/core';
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import { useReusableForm, ReusableForm } from '../reusableForms/useReusableForm';
import * as encounterService from "../../services/configService";
import { GlobalContext } from '../../context/GlobalState'



const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    encounterType: 'CONSULTA',
    patientType: 'NUEVO',
    serviceType: 'AMBULATORIA',
    sensibility: 'NORMAL',
    serviceBundle: 'PAQUETE#1',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm() {
    const { applicationFields } = useContext(GlobalContext)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        //setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useReusableForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            //employeeService.insertEmployee(values)
            resetForm()
        }
    }

    return (
      <ReusableForm onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <ReusableControls.CustomDateTimePicker
                name='encounterDate'
                label='Fecha de Consulta'
                value={values.hireDate}
                onChange={handleInputChange}
            />
            <ReusableControls.CustomSelect
                name='encounterType'
                label='Tipo de Consulta'
                value={values.encounterType}
                onChange={handleInputChange}
                options={encounterService.getFieldsDataCollection(applicationFields,'encounterView','encounterType')}
                error={errors.encounterType}
            />
            <ReusableControls.CustomSelect
                name='patientType'
                label='Tipo de Paciente'
                value={values.patientType}
                onChange={handleInputChange}
                options={encounterService.getFieldsDataCollection(applicationFields,'encounterView','patientType')}
                // options={ applicationFields.filter(item => item.fieldType ==='patientType')
                //     .map((item) => ({
                //         id: item.id,
                //         field: item.fieldData
                //     }))}
                // error={errors.patientType}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReusableControls.CustomSelect
                  name='serviceType'
                  label='Tipo de Atención'
                  //value={values.departmentId}
                  value={values.serviceType}
                  onChange={handleInputChange}
                  options={ applicationFields.filter(item => item.fieldType ==='serviceType')
                          .map((item) => ({
                          id: item.id,
                          field: item.fieldData
                  }))}
                  error={errors.serviceType}
              />
              <ReusableControls.CustomSelect
                      name='sensibility'
                      label='Sensibilidad'
                      value={values.sensibility}
                      onChange={handleInputChange}
                      //options={employeeService.getDepartmentCollection()}
                      options={ applicationFields.filter(item => item.fieldType ==='sensibility')
                              .map((item) => ({
                                      id: item.id,
                                      field: item.fieldData
                              }))}
                      error={errors.sensibility}
              />
              <ReusableControls.CustomSelect
                      name='serviceBundle'
                      label='Paquetes de Servicio'
                      value={values.serviceBundle}
                      onChange={handleInputChange}
                      //options={employeeService.getDepartmentCollection()}
                      options={ applicationFields.filter(item => item.fieldType ==='serviceBundle')
                              .map((item) => ({
                                      id: item.id,
                                      field: item.fieldData
                              }))}
                      error={errors.servicesBundle}
              />
				</Grid>
						<Grid item xs={6}>
							<div>
									<ReusableControls.Button
											type="submit"
											text="Submit" />
									<ReusableControls.Button
											text="Reset"
											color="default"
											onClick={resetForm} />
							</div>
						</Grid>
					</Grid>
      </ReusableForm>
    )
}
