import React from 'react'
import {
    Grid,
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    ColumnChooser,
    Page,
    Inject,
    Resize,
    Edit,
    Toolbar,
    Sort,
    CommandColumn
  } from '@syncfusion/ej2-react-grids';
  import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
  //import { Browser} from '@syncfusion/ej2-base';
//import { L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
//import { data } from './datasource';
//import {orderService1} from './orderService1'
//import { getOrders, addOrder, updateOrder, deleteOrder } from './orderService1';
import { GlobalContext } from '../../context/GlobalState' 
import {DialogFormTemplate} from './DialogFormTemplate1'
import './DailyAppo1.css'

export default class DailyAppo1 extends React.Component{

    constructor(){
      super(...arguments)
      this.dataSource = new DataManager({
              adaptor: new UrlAdaptor(),
              insertUrl: '/api/v1/dataGrid/Insert',
              removeUrl: '/api/v1/dataGrid/Delete',
              updateUrl: '/api/v1/dataGrid/Update',
              url: "/api/v1/dataGrid/DataSource"
          });
      this.editOptions = { 
        showDeleteConfirmDialog: true,
        allowEditing: true, 
        allowAdding: true, 
        allowDeleting: true, 
        mode: 'Dialog', 
        template: this.dialogTemplate };
        
      this.toolbarOptions = ['ColumnChooser','Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.selectionOption = { type: 'Single', checkboxMode: 'ResetOnRowClick' };
      this.pageSettings = { pageSize: 20 };
      this.validationRules = { required: true };
      this.customValidate = {required:[this.customFn.bind(this),'TÉRMINO de CITA debe ser posterior a INICIO de CITA']};
      
      this.grid=Grid||null
      this.dataBound = this.dataBound.bind(this);
      this.commandClick = this.commandClick.bind(this);
      this.commands = [
        {
          buttonOption: {
            content: 'CONSULTA', 
            //cssClass: 'e-flat'
          }
        }
      ];
    }
    //grid = Grid | null;
    //data;
    static contextType = GlobalContext;
   
    commandClick(args) {
      if (this.grid) {
        //console.log(args.rowData)
        //console.log(this.context.currentPatient.lastName)
      }
    }
    dataBound(){
      if (this.grid) {
        this.grid.autoFitColumns(['appointmentType','appointmentStatus','StartTime', 'EndTime', 'fullName','noRegistered' ]);
      }
    }
     customFn(args) {      
      //console.log('customFn-validation: ',args)
      //return args['value'] == "" ? false : true;
      const endTime=args['value']
      const startTime=args['element']['form'][5].value
      //console.log(startTime)
      //console.log('customFn-validation-form: ',val['form'][5].value)
      return endTime>startTime ? true : false;
    };
    dialogTemplate(props){
        return (<DialogFormTemplate {...props} />);
      }
    
    // actionComplete(args){
    //     if (args.form) {
    //       if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
    //         /** Add Validation Rules */
    //           //args.form.ej2_instances[0].addRules('Freight', {max: 500});
    //       }
    //       /** Set initial Focus */
    //       if (args.requestType === 'beginEdit') {
    //           //(args.form.elements.namedItem('CustomerID') as HTMLInputElement).focus();
    //       } else if (args.requestType === 'add') {
    //           //(args.form.elements.namedItem('OrderID')as HTMLInputElement).focus();
    //       }
    //     }
    //   }   

      // actionComplete=(args) =>{
      //   console.log('actionComplete: ',args)
      //   if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      //       if (Browser.isDevice) {
      //           args.dialog.height = window.innerHeight - 90 + 'px';
      //           args.dialog.dataBind();
      //           //args.dialog.width='250px'
      //       }
      //   }
      // }  
    onActionFailure = (e) => {
      const span = document.createElement('span');
      if (this.grid) {
          (this.grid.element.parentNode).insertBefore(span, this.grid.element);
          span.style.color = "#FF0000";
          span.innerHTML = "Server exception: 404 Not found";
      }
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    actionBegin (args) {
      console.log('dataGrid.actionBegin: ',args)
        if (args.requestType === 'save' && args.form) {
          /** cast string to integer value */
          //setValue('data.Freight',
            //parseFloat((args.form.querySelector("#Freight") as HTMLInputElement).value), args);
        }
      }

   
    actionComplete(args) {
      console.log('dataGrid.actionComplete: ',args)
      if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          /** Add Validation Rules */
          //(args.form).ej2_instances[0].addRules('Freight', {max: 500});
      }
    }
    // actionComplete(args) {
    //   if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
    //     const dialog = args.dialog;
    //     dialog.height = 400;
    //     // change the header of the dialog
    //     dialog.header = args.requestType === 'beginEdit' ?
    //       'Record of ' +  getValue('CustomerID', args.rowData) : 'New Customer';
    //   }
    // }
    // renderComplete() {
    //   console.log('renderComplete')
    //     if(this.grid && (this.grid.dataSource instanceof Array
    //         && !(this.grid.dataSource).length)) {
    //         const state = { skip: 0, take: 10 };
    //         this.dataStateChange(state);
    //     }
    // }
    // dataStateChange(state) {
    //   console.log('dataStateChange: ',state)
    //   this.orderService.execute(state).then(( gridData ) => {
    //     if (this.grid) {
    //         this.grid.dataSource = gridData
    //     }
    //   });
    // }
    // dataSourceChanged(state) {
    //     console.log('dataSourceChanged')
    //     // if (state.action === 'add') {
    //     //   this.orderService.addRecord(state).then(() => state.endEdit());

    //     // } else if (state.action === 'edit') {
    //     //   this.orderService.updateRecord(state).then(() => state.endEdit());
    //     // } else if (state.requestType === 'delete') {
    //     //   this.orderService.deleteRecord(state).then(() => state.endEdit());
    //     // }
    //   }
    
    render() {
        this.actionComplete = this.actionComplete.bind(this);
        this.actionBegin = this.actionBegin.bind(this);
        //this.renderComplete = this.renderComplete.bind(this);
        //this.dataStateChange = this.dataStateChange.bind(this);
        //this.dataSourceChanged = this.dataSourceChanged.bind(this)

        //column autofit, same as autoFitColumns in dataBound
        //<ColumnDirective headerText='Commands' width='120' commands= {this.commands}/>
        return (
        <GridComponent 
            height='650px'
            locale='es' 
    
            allowResizing={true}
            showColumnChooser={true}
            isResponsive={true}
            commandClick={this.commandClick}
            actionFailure={this.onActionFailure}
            
            dataBound= { this.dataBound }
            dataSource={this.dataSource}
            //dataSource={this.dataManager} 
            editSettings={this.editOptions} 
            selectionSettings={this.selectionOption}
            toolbar={this.toolbarOptions}
            ref={g => this.grid = g} 
            pageSettings={this.pageSettings}
            allowPaging={true}
            actionBegin={this.actionBegin}
            //renderComplete={this.renderComplete}
            //dataBound={this.renderComplete} 
            actionComplete={this.actionComplete}
            //dataStateChange={this.dataStateChange} 
            
            
            //dataStateChange={this.dataStateChange}
            //dataSourceChanged={this.dataSourceChanged}
            clipMode='EllipsisWithTooltip'
            >
             <ColumnsDirective>
             <ColumnDirective headerText='Commands' width='120' commands= {this.commands}/> 
                <ColumnDirective
                    type="checkbox"
                    allowSorting={false}
                    allowFiltering={false}
                    width="45" allowEditing={false}
                    displayAsCheckBox={true}
                />
                <ColumnDirective showInColumnChooser={true} 
                  field='appointmentId' headerText='ID' textAlign='Right' width='85' isPrimaryKey={true} />
                <ColumnDirective field='appointmentType' headerText='Tipo Cita' width='100' />
                <ColumnDirective field='appointmentStatus' headerText='Estado' width='120'/>
                <ColumnDirective field='StartTime' headerText='De' width='200' type='date' format= 'dd/MM/yyyy hh:mm a'/>
                <ColumnDirective field='EndTime' headerText='A' width='200' type='date' format= 'dd/MM/yyyy hh:mm a' 
                  validationRules={this.customValidate}/>
                <ColumnDirective field='patient' 
                  headerText='PatientId' width='200' visible={false}  />
                <ColumnDirective field='fullName' headerText='Paciente' />
                <ColumnDirective field='noRegistered' headerText='No Registrado' />
                <ColumnDirective showInColumnChooser={true} field='patient.phone' headerText='Teléfono' />
                </ColumnsDirective>
                <Inject services={[CommandColumn,ColumnChooser,Resize, Page, Edit, Toolbar, Sort]} />
        </GridComponent>
        )
    }
}