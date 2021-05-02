//import React from 'react'
import React from 'react';
//import { DataUtil } from '@syncfusion/ej2-data';
//import { data as orderData } from './data';
//import { Browser, extend } from '@syncfusion/ej2-base';
import {extend} from '@syncfusion/ej2-base'
//import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { AutoCompleteComponent, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
//import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
//import 'date-fns'
//import DateFnsUtils from '@date-io/date-fns'

//Use Wizard like Dialog Editing in React Grid component
//Customize the Edit Dialog in React Grid component



export class DialogFormTemplate extends React.Component {
    constructor(props) {
        super();
        
        this.state = extend(
            {}, 
            {}, 
            props, true
            )
        //this.state = Object.assign({}, props);
        //this.state = Object.assign( props);
        //this.onChange = this.onChange.bind(this);
      
        //for AUTOCOMPLETE
        this.patientData = new DataManager({
        url: '/api/v1/appointments/patients',
        adaptor: new UrlAdaptor(),
        crossDomain: true
        });
        this.queryAutoComplete = new Query().from('Patients').select(['lastName', 'historyId']).take(25);
        // maps the appropriate column to fields property
        //this.fieldsAutoComplete = { value: '_id'};
        this.fieldsAutoComplete = { value: 'lastName'};
        // sort the resulted items
        this.sortOrderAutoComplete = 'Ascending';
    }
    componentDidMount() {
        //let state = this.state.old;
        //let state=this.state
        //console.log('DialogeTemplate-componentDidMountstate: ',state)
        // Set initail Focus
        //state.isAdd ? this.appointmentID.focus() : this.appointmentType.focus();
    }
    onChange(args) {
        //console.log('DialogFormTemplate - onChange: ',args.target.name)
        // let key = args.target.name;
        // let value = args.target.value;
        // this.setState({ [key]: value });
        this.setState({[(args.target).name]: args.target.value});
        if(args.target.name==='noRegistered'){
            //console.log('trying to empty')
            //this.fullNameObj.value = ''
            //this.patientObj.value = ''
            //this.setState({['patient']:''})
            //this.setState({['fullName']:''})
            this.setState({'patient':''})
            this.setState({'fullName':''})
            this.searchPatientObj.value=null
        }
    }
  
   

    //for AUTOCOMPLETE
    headerTemplateAutoComplete(data) {
        return (
          <span className='head'> <span className='name'>  Nro. Historia - Apellidos, Nombres </span></span>
        );
      }
      // set the value to itemTemplate property
      itemTemplateAutoComplete(data){
        return (
        <span className='name'>{data.historyId} - {data.lastName} {data.lastName2}, {data.firstName}</span>
          );
      }
      onSelectAutoComplete(args){
        //args.e.preventDefault();
        //console.log('onSelectAutoComplete: ',args)
        //this.setState({fullName: args.itemData.fullName, patient: args.itemData._id})
        //document.getElementById("fullName").innerHTML =args.itemData.fullName
        //this.listObj.value = args.data.search || null
        //this.patient.fullName=args.itemData._id
        this.fullNameObj.value = args.itemData.fullName
        this.patientObj.value = args.itemData._id
        this.noRegisteredObj.value=''
      }

    render() {
        //this.onChange = this.onChange.bind(this);
        let data = this.state;
        return (<div>
            <div className="form-row">    
                <div className="form-group col-md-6">    
                    <div className="e-float-input e-control-wrapper">
                        <input ref={input => this.appointmentId = input} 
                            id="appointmentId" 
                            name="appointmentId" 
                            type="text" 
                            readOnly={true}
                            disabled={data.isAdd} 
                            value={data.appointmentId||''} 
                            onChange={this.onChange.bind(this)}/>
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> ID</label>
                    </div>
                </div>
            </div>  
            <div className="form-row">  
                <div className="form-group col-md-6"> 
                    <DropDownListComponent 
                    width='100%'
                    id="appointmentType" 
                    value={data.appointmentType} 
                    dataSource={['Consulta', 'Examen', 'Operación','Laboratorio', 'otro']} 
                    //fields={{ text: 'Tipo de Citas', value: 'appointmentType' }} 
                    placeholder="Tipo de Cita" 
                    popupHeight='300px' 
                    floatLabelType='Always'>
                </DropDownListComponent>
                </div>
                <div className="form-group col-md-6"> 
                    <DropDownListComponent 
                        id="appointmentStatus" 
                        value={data.appointmentStatus} 
                        dataSource={['Programada', 'Confirmada', 'Postergada','Cancelada', 'Atendida']} 
                        //fields={{ text: 'Estado de Cita', value: 'appointmentStatus' }} 
                        placeholder="Estado de Cita" 
                        popupHeight='300px' 
                        floatLabelType='Always'>
                    </DropDownListComponent>
                </div>
            </div>    
            <div className="form-row"> 
                <div className="form-group col-md-6"> 
                    <DateTimePickerComponent
                        id="StartTime" 
                        value={data.StartTime} 
                        placeholder="Inicio de Cita" 
                        floatLabelType='Always'>
                    </DateTimePickerComponent>
                </div>
                <div className="form-group col-md-6"> 
                    <DateTimePickerComponent
                        id="EndTime" 
                        value={data.EndTime} 
                        placeholder="Término de Cita" 
                        floatLabelType='Always'>
                    </DateTimePickerComponent>
            </div>
            </div>   
            <div className="form-row">
                <div className="form-group col-md-12">    
                    <div className="e-float-input e-control-wrapper">
                        <AutoCompleteComponent 
                            //ref={AC => this.acObj = AC} 
                            id="searchPatient" 
                            name="searchPatient" 
                            type="text"  
                            //onChange={this.onChangeAC.bind(this)}
                            //id="search"  
                            //data-name='search' 
                            //className="e-field"  //this does not work for AUTOCOMPLETE
                            //className=''
                            //name='search'
                            ref={(AutoComplete) => { this.searchPatientObj = AutoComplete; }}
                            locale="es"
                            itemTemplate={this.itemTemplateAutoComplete} 
                            headerTemplate={this.headerTemplateAutoComplete}
                            select={this.onSelectAutoComplete.bind(this)} 
                            //change={this.onChangeAutoComplete.bind(this)}
                            minLength={2}
                            suggestionCount={15}
                            //showSpinner={true}
                            highlight={true} 
                            showClearButton={true}
                            //autofill={true}
                            //highlight={true}
                            //ignoreCase={true}
                            //filterType='ContainsContains'
                            dataSource={this.patientData}
                            query={this.queryAutoComplete}
                            fields={this.fieldsAutoComplete}
                            sortOrder={this.sortOrderAutoComplete}
                            //popupHeight="250px" 
                            //popupWidth="250px" 
                            placeholder="Buscar Paciente por A. Paterno"

                            style={{ width: '100%' }}
                            //floatLabelType='PatienteId'
                            floatLabelType='Always'
                            />
                        
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"></label>
                    </div>
                </div>
            </div>  
            
            <div className="form-row">     
                <div className="form-group col-md-12">    
                    <div className="e-float-input e-control-wrapper">
                        <input  
                            //ref={input => this.patient.fullName = input} 
                            readOnly={true}
                            ref={input => this.fullNameObj = input} 
                            id="fullName" 
                            name="fullName" 
                            type="text"  
                            value={data.fullName||''} 
                            //value={(data.patient) ? data.patient.fullName : ''} 
                            //onChange={this.onChange.bind(this)}
                            />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> Paciente</label>
                    </div>
                </div>
            </div>

            <div className="form-row">     
                <div className="form-group col-md-12">    
                    <div className="e-float-input e-control-wrapper">
                        <input  
                            //ref={input => this.patient.fullName = input} 
                            readOnly={true}
                            ref={input => this.patientObj = input} 
                            id="patient" 
                            name="patient" 
                            type="text"  
                            value={data.patient||''} 
                            //value={(data.patient) ? data.patient.fullName : ''} 
                            //onChange={this.onChange.bind(this)}
                            //onChange={this.onChange}
                            />

                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> PacienteId</label>
                    </div>
                </div>
            </div>

            <div className="form-row">    
                <div className="form-group col-md-12">    
                    <div className="e-float-input e-control-wrapper">
                        <input  
                            //ref={input => this.patient.fullName = input} 
                            ref={input => this.noRegisteredObj = input} 
                            autoComplete='off'
                            id="noRegistered" 
                            name="noRegistered" 
                            type="text"  
                            value={data.noRegistered||''} 
                            //value={((data.noRegistered) ? data.noRegistered : null)||null} 
                            onChange={this.onChange.bind(this)}
                    />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> Paciente No Registrado</label>
                    </div>
                </div>
            </div>    
        </div>)
    }
  }

 