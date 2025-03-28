import React,{useState} from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import './Calendar.scss';
import moment from 'moment';
import 'moment/locale/pt-br';

//  moment.updateLocale("pt"); // Define explicitamente o locale
//  console.log(moment().locale("pt")); // Deve imprimir "pt-br"
// console.log(moment().format('LLLL')); // Deve imprimir a data em português
const DragAndDropCalendar = withDragAndDrop(Calendar);
// const localizer = momentLocalizer(moment);

const locales = {
    'pt-BR': ptBR, // Define o locale para português do Brasil
  };
// const shortWeekDays =[
// { day:"Dom"},{ day:"Seg"},
// {day:"Ter"},
// { day:"Quar"},{ day:"Quin"},{ day:"Sex"},{ day:"Sab"}]
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
    getDay,
    locales,
  });


function Calendario(){

    const [eventos, setEventos] = useState([{
        id:1,
        title: "Mutirão das esponjas",
        start: new Date(2025,2,26,10,0),
        end: new Date(2025,2,26,15,0),
        desc: "Primeiro mutirão",
        color: "#195D39",
        tipo: "Atividade",
    },
    {
        id:2,
        title: "Esponjas do bob",
        start: new Date(2025,2,26,10,0),
        end: new Date(2025,2,26,15,0),
        desc: "Segundo mutirão",
        color: "#195D39",
        tipo: "Atividade",
    }
    ])

    const eventStyle = (e) => ({
        style:{
            backgroundColor: e.color
        },
    })

    return(
        <div className="calendario">
            <DragAndDropCalendar
            culture="pt-BR"
            defaultDate={moment().toDate()}
            defaultView='month'
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            localizer={localizer}
            resizable
            components={{
                toolbar: CustomTollbar,
            }}
            className="calendar"
            eventPropGetter={eventStyle}
            messages={{
                date: "Data",
                time: "Hora",
                event: "Evento",
                noEventsInRange: "Nenhum evento neste período.",
              }}
            />
        </div>
    )

}

const CustomTollbar = ({label, onView, onNavigate, views}) => {
    const [itemText, setItemText]= useState('Mês');
    const viewsItem= [
        { label: "Mês", value: views[0]},
        { label: "Semana", value: views[1]},
        { label: "Dia", value: views[2]},
        { label: "Agenda",value: views[3]}
    ]
    return(
        <div className="toolbar-container" >
            <h1 className="mesAno">{label}</h1>
            <div className="dirtop">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        >{itemText}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {viewsItem.map((view, index) =>(
                            <div key={index}>
                                <li>
                                    <button className="dropdown-item" onClick={()=>onView(view.value) + setItemText(view.label)}>{view.label}</button>
                                </li>
                            </div>
                        ))

                        }

                    </ul>
                </div>
                <div className="toolbar-navigation" style={{marginLeft:"15px"}}>
                    <button
                        className="btn btn-secondary btn-ls mr-2 border-0"
                        onClick={()=>onNavigate('TODAY')}
                    >Hoje</button>
                    <button
                        className="btn btn-sm mr-2 text-secondary"
                        onClick={()=>onNavigate('PREV')}
                    ><i className="bi bi-caret-left"></i></button>
                    <button
                        className="btn btn-sm mr-2 text-secondary"
                        onClick={()=>onNavigate('NEXT')}
                    ><i className="bi bi-caret-right"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Calendario