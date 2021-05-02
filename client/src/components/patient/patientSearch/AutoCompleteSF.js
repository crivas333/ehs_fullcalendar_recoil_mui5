import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import React from 'react';
// import * as ReactDOM from "react-dom";
import { DataManager, UrlAdaptor,Query } from '@syncfusion/ej2-data';
//import { L10n } from '@syncfusion/ej2-base';
//import { SortOrder } from '@syncfusion/ej2-lists';
import {GlobalContext} from '../../../context/GlobalState'
import './AutoCompleteSF.css'



// export default class AutoCompleteSF extends React.Component {
class AutoCompleteSF extends React.Component {
  
  constructor(props, context){
    super(...arguments)
    this.customerData = new DataManager({
      url: '/api/v1/appointments/patients',
      //url: 'https://services.odata.org/V4/Northwind/Northwind.svc/',
      adaptor: new UrlAdaptor(),
      //adaptor: new ODataV4Adaptor(),
      crossDomain: true
    });
    
    //this.sportsData = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Gymnastics', 'Hockey', 'Rugby', 'Snooker', 'Tennis'];
    // bind the Query instance to query property
    //this.query = new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6);
    this.query = new Query().from('Patients').select(['lastName', 'historyId']).take(6);
    // maps the appropriate column to fields property
    this.fields = { value: 'lastName' };
    // sort the resulted items
    this.sortOrder = 'Ascending';
    //this.contextType = GlobalContext;
  }
  //static contextType = GlobalContext;
  headerTemplate(data) {
    return (
      <span className='head'> <span className='name'>  Nro. Historia - Apellidos, Nombres </span></span>
    );
  }
   // set the value to itemTemplate property
   itemTemplate(data){
    return (
    <span className='name'>{data.historyId} - {data.lastName} {data.lastName2}, {data.firstName}</span>
      );
  }

    // set locale culture to AutoComplete

  optionSelected(args){
  
    console.log('AutoComplete-change:', args.itemData)
    if (args.itemData._id) {
      const id=args.itemData._id
      //console.log('AutoComplete-change _id:', args.itemData._id)
      this.context.getPatientByIdAPOLLO(id)
      //console.log("Patient Selected: ", this.context.currentPatient);
    }
  }
  render() {
    return (
       // specifies the tag for render the AutoComplete component
      <AutoCompleteComponent  
        //CssClass="conversion"
        locale="es"
        itemTemplate={this.itemTemplate} 
        headerTemplate={this.headerTemplate}
        //change={this.optionSelected}
        change={this.optionSelected.bind(this)} 
        id='atcelement' 
        //showSpinner={true}
        showClearButton={true}
        //autofill={true}
        //highlight={true}
        //ignoreCase={true}
        //filterType='ContainsContains'
        dataSource={this.customerData}
        query={this.query}
        fields={this.fields}
        sortOrder={this.sortOrder}
        //popupHeight="250px" 
        //popupWidth="250px" 
        placeholder="Ingrese Apellido Paterno"
      >
        
      </AutoCompleteComponent>
    );
  }
}
AutoCompleteSF.contextType = GlobalContext;
export default AutoCompleteSF;

/*
itemTemplate(data){
    return (
      <span><span className='name'>{data.lastName}</span><span className ='city'>{data.lastName}</span></span>
      );
  }
*/