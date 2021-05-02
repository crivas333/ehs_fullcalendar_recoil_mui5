import * as React from 'react'
//import { L10n,setCulture, loadCldr } from '@syncfusion/ej2-base'
import { L10n, loadCldr } from '@syncfusion/ej2-base'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { ViewsDirective, ViewDirective} from '@syncfusion/ej2-react-schedule'
import AsyncSelectDummy from '../patient/patientSearch/AsyncSelectDummy';
// import { extend, L10n } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
// import { ODataV4Adaptor, WebApiAdaptor} from '@syncfusion/ej2-data';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { GlobalContext } from '../../context/GlobalState'
import './SchedulerView.css'
import './custDialog.css'
//import AutoCompleteET from '../patientData/AutoCompleteET';

L10n.load({
  'es': {
      'schedule': {
          'saveButton': 'Guardar',
          'cancelButton': 'Cerrar',
          'deleteButton': 'Borrar',
          'newEvent': 'Nueva Cita',
      },
  }
});
//setCulture('es');



// class App extends React.Component, ODataV4Adaptor {
class Scheduler extends React.Component {    
    constructor() {
        super(...arguments);
        this.state = {
          fullName: null,
          patient: null,
        };
        this.onAutoCompleteChange = this.onAutoCompleteChange.bind(this);
        this.onActionBegin = this.onActionBegin.bind(this);
        //for SCHEDULER
        this.dataManager = new DataManager({
            url: '/api/v1/appointments/getData',
            crudUrl: '/api/v1/appointments/crud',
            adaptor: new UrlAdaptor(),
            crossDomain: true
        });
        this.dataQuery = new Query().from("Appoitments");
        
        //for AUTOCOMPLETE
     
    
    }
    
    shouldComponentUpdate() { 
        return false; // Will cause component to never re-render. 
      } 
   
   
    onPopupOpen(args) {
      //console.log('onPopupOpen: ',args.type)
      
      //Disable QuickInfo 
      if((args.type === 'QuickInfo')||(args.type==='ViewEventInfo') )
      {//args.cancel = true;
        var dialogObj = args.element.ej2_instances[0];
        dialogObj.hide();
        var currentAction = args.target.classList.contains('e-work-cells') ? 'Add' : 'Save';
        this.scheduleObj.openEditor(args.data, currentAction);
      }
      if (args.type === 'Editor') {
        
        //for AutoComplete:
        this.fullNameObj.value = args.data.fullName || null
        this.patientObj.value = args.data.patient || null
    }
    }
    onEventRendered(args) {
      //console.log('OnEventRendered: ',args)
        switch (args.data.appointmentStatus) {
            case 'Programada':
                args.element.style.backgroundColor = '#F57F17';
                break;
            case 'Confirmada':
                args.element.style.backgroundColor = '#7fa900';
                break;
            case 'Postergada':
                args.element.style.backgroundColor = '#8e24aa';
                break;
            case 'Cancelada':
                  args.element.style.backgroundColor = '#92a8d1';
                  break;
            case 'Atendida':
              args.element.style.backgroundColor = '#808080';
              break;      
            default:
        }
    }
    onActionFailure(e){
        //alert('Server exception: 404 Not found')
        let span = document.createElement('span');
        this.scheduleObj.element.parentNode.insertBefore(span, this.scheduleObj.element);
        span.style.color = '#FF0000';
        span.innerHTML = 'Server exception: 404 Not found';
    }
   
    onActionBegin(args) {
        console.log('Scheduler.onActionBegin: ',args.data)
        //Allow or disable multiples appointments within the same time slot
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            // let data = args.data instanceof Array ? args.data[0] : args.data;
            // if (!this.scheduleObj.isSlotAvailable(data.StartTime, data.EndTime)) {
            //     args.cancel = true;
            // }
        }
        //for AutoCompleteET
        if (args.requestType === 'eventCreate') {
          // console.log('eventCreate-patientId: ',this.listObj.value)
          //args.data[0].search = this.searchPatientObj.value;
          args.data[0].search = this.state.patient;
          args.data[0].fullName = this.state.fullName;
          args.data[0].patient = this.state.patient;
          //this.setState({fullName: '', patient: ''})
          this.setState({fullName: null, patient: null})
          //console.log('patient: ',args.data[0].patient)
        }
        if(args.requestType === 'eventChange') {
          
          //args.data.search = this.searchPatientObj.value;
          args.data.search = this.state.patient;
          //console.log('onActionBegin-eventChange-state: ',this.state.fullName)
          if(this.state.patient){
            args.data.fullName = this.state.fullName;
            args.data.patient = this.state.patient;
          }
          //this.setState({fullName: '', patient: ''})
          //console.log('onActionBegin-eventChange-fullname: ',args.data.fullName)
        }
    }
    onChangeNoRegistered(args) {
      //console.log('DialogFormTemplate - onChange: ',args.target.name)
      // let key = args.target.name;
      // let value = args.target.value;
      // this.setState({ [key]: value });
      //this.setState({[(args.target).name]: args.target.value});
      if(args.target.name==='noRegistered'){
          console.log('trying to empty')
          //this.fullNameObj.value = ''
          //this.patientObj.value = ''
          //this.setState({['patient']:''})
          //this.setState({['fullName']:''})
          //this.searchPatientObj.value=null
          //this.searchPatientObj.value = args.data.search || null
          this.setState({fullName: null, patient: null})
          this.fullNameObj.value = null
          this.patientObj.value = null
      }
  }
    onAutoCompleteChange(val){
      console.log('lifted state: ',val)
      // // console.log('onSelectAutoComplete: ',args)
      // this.setState({fullName: args.itemData.fullName, patient: args.itemData._id})
      // this.noRegisteredObj.value=''
      // this.patientObj.value=args.itemData._id
      // this.fullNameObj.value=args.itemData.fullName
      
      this.setState({fullName: val.fullName, patient: val.id})
      this.noRegisteredObj.value=''
      this.patientObj.value=val.id
      this.fullNameObj.value=val.fullName
    }
    editorTemplate(props) {
      console.log('editorTemplate - props: ',props)
      
      return ((props !== undefined) ? 
      
      <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}>
        <tbody>
      
          <tr><td className="e-textlabel">TIPO</td><td style={{ colspan: '4' }}>
            <DropDownListComponent 
              id="appointmentType" 
              placeholder='Ingrese tipo de cita' 
              //data-name='appointmentType' 
              className="e-field" 
              style={{ width: '100%' }} 
              dataSource={['Consulta', 'Control', 'Examen', 'Procedimiento', 'Operación', 'otro']} 
              value={props.appointmentType ||'Consulta' }
              //value={'Consulta'}
              //ref={(scope) => { this.dropDownListObject = scope; }}
              >
            </DropDownListComponent>
          </td></tr>

          <tr><td className="e-textlabel">ESTADO</td><td style={{ colspan: '4' }}>
                  <DropDownListComponent 
                    id="appointmentStatus" 
                    placeholder='Ingrese estado' 
                    data-name='appointmentStatus' 
                    className="e-field" 
                    style={{ width: '100%' }} 
                    dataSource={['Programada', 'Confirmada', 'Postergada', 'Cancelada', 'Atendida']} 
                    value={props.appointmentStatus||'Programada' }
                    //value='Programada'
                    
                    >
                  </DropDownListComponent>
                </td></tr>
                
          <tr><td className="e-textlabel">Desde</td><td style={{ colspan: '4' }}>
            <DateTimePickerComponent 
              id="StartTime" 
              format='dd/MM/yy hh:mm a' 
              data-name="StartTime" 
              value={new Date(props.startTime|| props.StartTime)} 
              className="e-field">
            </DateTimePickerComponent>
          </td></tr>

          <tr><td className="e-textlabel">Hasta</td><td style={{ colspan: '4' }}>
            <DateTimePickerComponent 
              id="EndTime" 
              format='dd/MM/yy hh:mm a' 
              data-name="EndTime" 
              value={new Date(props.endTime||props.EndTime)} 
              className="e-field">
            </DateTimePickerComponent>
          </td></tr>
          
          <tr><td className="e-textlabel">I) Buscar Paciente</td><td style={{ colspan: '4' }}>
          <AsyncSelectDummy 
            //ref = {this.selectRef}
            //ref={(AutoComplete) => { this.searchPatientObj = AutoComplete; }}
            onValChange={this.onAutoCompleteChange}
          />

          </td></tr>
        
          <tr><td className="e-textlabel">Paciente</td><td colSpan={4}>
            <input 
              id="fullName" 
              className="e-field e-input" 
              ref={(TA1) => { this.fullNameObj = TA1; }} 
              readOnly={true}
              type="text" 
              name="fullName" 
              style={{ width: '100%' }}/>
          </td></tr>
          
          <tr><td className="e-textlabel">PacienteId</td><td colSpan={4}>
            <input 
              id="patient" 
              className="e-field e-input" 
              ref={(TA2) => { this.patientObj = TA2; }} 
              readOnly={true}
              type="text" 
              name="patient" 
              style={{ width: '100%' }}/>
          </td></tr>
          
          <tr><td className="e-textlabel">II) Paciente no Registrado</td><td colSpan={4}>
            <input 
              id="noRegistered" 
              className="e-field e-input" 
              ref={(input) => { this.noRegisteredObj = input; }} 
              onChange={this.onChangeNoRegistered.bind(this)}
              type="text" 
              name="noRegistered" 
              autoComplete='off'
              style={{ width: '100%' }}/>
            
          </td></tr>
          
          <tr><td className="e-textlabel">Descripción</td><td colSpan={4}>
            <textarea 
              id="Description" 
              className="e-field e-input" 
              name="Description" 
              autoComplete='off'
              rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}>
            </textarea>
          </td></tr>
      
      </tbody></table> : <div></div>);
  }
    
 
    render() 
    {
      loadCldr(
        require('cldr-data/supplemental/numberingSystems.json'),
        require('cldr-data/main/es/ca-gregorian.json'),
        require('cldr-data/main/es/numbers.json'),
        require('cldr-data/main/es/timeZoneNames.json')
      );
      L10n.load(require('@syncfusion/ej2-locale/src/es.json'));
      //setCulture('es');

      //<div className='control-pane'>
          //<div id='targetElement' className='control-section col-lg-12 defaultDialog dialog-target'>
           

        return (
          <div className='control-pane'>
            <div id='targetElement' className='control-section col-lg-12 defaultDialog dialog-target'>
         
                
                <ScheduleComponent 
                height='750px' 
                //height='100%'
                width='100%'
                locale='es'
                //height='auto' width='auto' 
                showHeaderBar={true}  // default:true

                //selectedDate={new Date(2020, 8, 8)} 
                //selectedDate={new Date(2017, 5, 1)} 
                allowResizing={true} //default
                currentView='Week'
                //dateFormat='dd-MM-yyyy'
                timezone='America/Lima'
                readonly={false} 
                //actionBegin={this.onActionBegin.bind(this)}
                enablePersistence={true} // causes GOOGLE-CHROME fail !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                delayUpdate='true'  // to avoid rerendering ??
                eventSettings={{ dataSource: this.dataManager, enableTooltip: true, query: this.dataQuery,
                  fields: {
                    id: 'appointmentId',
                     //subject: { name: 'fullName'},
                    subject: { name: 'appointmentType'},
                    //subject: { name: 'appointmentType', default: 'Consu'},
                    location: { name: 'fullName', title: 'Paciente' },
                    description: { name: 'Description', title: 'Descripción' },
                    startTime: { name: 'StartTime', title: 'Desde' },
                    endTime: { name: 'EndTime', title: 'Hasta' },
                    //appointmentType: { name:'appointmentType', title:'Tipo'},
                    //appointmentStatus: { name:'appointmentStatus', title:'Estado'},
                    appointmentStatus: { name:'appointmentStatus', title:'Estado', default: 'Programada'},
                    noRegistered: {name: 'noRegistered', title: 'No Registrado'},
                    fullName: {name:'fullName', title: 'Paciente'},
                    patient: {name:'patient', title:'PatientId'}
                    
                  }
                }}
                
                //to prevent opening 'ViewEvenInfo' on responsive mode (mobile)
                isResponsive={true}
                popupOpen={this.onPopupOpen.bind(this)}
                eventRendered={this.onEventRendered.bind(this)}
                editorTemplate={this.editorTemplate.bind(this)} 
                ref={schedule => this.scheduleObj = schedule} 
                actionBegin={this.onActionBegin.bind(this)}
                showQuickInfo={true} //this is overriden in PopupOpen, so that single click launches EventEditor 
                //quickInfoTemplates={{ header: this.header.bind(this), content: this.content.bind(this), footer: this.footer.bind(this) }}
                
                >
                 
                  <ViewsDirective>
                    <ViewDirective 
                      option='Day' startHour='07:00' endHour='23:00'
                      timeScale={{ enable: true, slotCount: 3 }}
                      />
                    <ViewDirective 
                      option='Week' startHour='07:00' endHour='23:00'
                      timeScale={{ enable: true, slotCount: 3 }}
                      />
                    <ViewDirective option='WorkWeek' startHour='07:00' endHour='23:00'/>
                    <ViewDirective 
                      option='Month' 
                      startHour='07:00' endHour='23:00'
                      //ShowAgendaView="True"
                      />
                    <ViewDirective 
                      option='Agenda' 
                      //hideEmptyAgendaDays='true' 
                      allowVirtualScrolling='false' 
                      //timeScale={{ enable: true, slotCount: 3 }}
                      //eventTemplate={this.eventTemplate.bind(this)}
                      />
                    
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize,DragAndDrop]}/>
                </ScheduleComponent>
            </div>
            </div>
            
        );
    }
}
;
Scheduler.contextType = GlobalContext
export default Scheduler;

/*
 <tr><td className="e-textlabel">Paciente</td><td style={{ colspan: '4' }}  >
        <textarea 
          id="fullName" 
          className="e-field e-input" 
          name="fullName"
          ref={(TA1) => { this.textObj1 = TA1; }}  
          rows={1} cols={50} style={{ width: '100%', height: '20px !important', resize: 'vertical' }}></textarea>
      </td></tr>
<tr><td className="e-textlabel">PacientId</td><td style={{ colspan: '4' }}  >
        <textarea 
          id="patient" 
          className="e-field e-input" 
          name="patient"
          ref={(TA2) => { this.textObj2 = TA2; }}  
          rows={1} cols={50} style={{ width: '100%', height: '20px !important', resize: 'vertical' }}></textarea>
      </td></tr>
*/

// <ViewDirective option='TimelineWeek' interval={3} workDays={this.workDays} />
/*
 eventTemplate(props) {
      return (<div className="template-wrap">
    <div className="appointmentType">{props.appointmentType}</div>
    <div className="time">
      Time: {this.getTimeString(props.StartTime)} - {this.getTimeString(props.EndTime)}</div>
    </div>)
    }
*/

/*
eventTemplate: '<div class="template-wrap"><div class="subject">${Subject}</div><div class="time">${getTimeString(data.StartTime)} - ${getTimeString(data.EndTime)}</div></div>',
       
*/
/*
<tr><td className="e-textlabel">Summary</td><td style={{ colspan: '4' }}>
        <input id="Summary" className="e-field e-input" type="text" name="Subject"  style={{ width: '100%' }}/>
      </td></tr>
*/