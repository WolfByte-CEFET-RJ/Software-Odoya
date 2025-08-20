import React, { useState, useEffect } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./Calendar.scss";
import moment from "moment";
import "moment/locale/pt-br";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales,
});

function Calendario({ eventos }) {
  const events = eventos.map((evento) => {
    const [strData, strHora] = evento.date.split("T");
    const [year, month, day] = strData.split("-").map(Number);
    const [hour, minute] = strHora.split(":").map(Number);

    const dateStart = new Date(year, month - 1, day, hour, minute);

    // Cálculo da duração em horas:minutos
    const [durHour, durMin] = evento.estimatedDuration.split(":").map(Number);

    const dateEnd = new Date(dateStart);
    dateEnd.setHours(dateEnd.getHours() + durHour);
    dateEnd.setMinutes(dateEnd.getMinutes() + durMin);

    const color = ["#2ECC71", "#3498DB", "#1ABC9C", "#A569BD"];

    let idx = Math.floor(Math.random() * color.length);

    return {
      title: evento.name,
      start: dateStart,
      end: dateEnd,
      desc: `Localização: ${evento.location}`,
      // color: "#195D39",
      color: color[idx],
    };
  });

  const eventStyle = (e) => ({
    style: {
      backgroundColor: e.color,
    },
  });
  const [viewAtual, setViewAtual] = useState("month");
  const [dataAtual, setDataAtual] = useState(new Date());

  // Força sincronização com a view inicial
  useEffect(() => {
    setViewAtual("month");
  }, []);

  return (
    <div className="calendario">
      <DragAndDropCalendar
        culture="pt-BR"
        defaultDate={moment().toDate()}
        view={viewAtual}
        onView={setViewAtual}
        date={dataAtual}
        onNavigate={setDataAtual}
        // onNavigate={(novaData) => setDataAtual(novaData)}
        // defaultView='month'
        events={events}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        resizable
        components={{
          toolbar: (props) => (
            <CustomTollbar
              {...props}
              viewAtual={viewAtual}
              setViewAtual={setViewAtual}
              dataAtual={dataAtual}
              setDataAtual={setDataAtual}
            />
          ),
        }}
        className="calendar"
        eventPropGetter={eventStyle}
      />
    </div>
  );
}

const CustomTollbar = ({
  label,
  views,
  viewAtual,
  setViewAtual,
  onNavigate,
  dataAtual,
  setDataAtual,
}) => {
  const [itemText, setItemText] = useState("Mês");
  const viewsItem = [
    { label: "Mês", value: views[0] },
    { label: "Semana", value: views[1] },
    { label: "Dia", value: views[2] },
    { label: "Agenda", value: views[3] },
  ];

  const handleViewChange = (view) => {
    setViewAtual(view);
    const selected = viewsItem.find((v) => v.value === view);
    setItemText(selected ? selected.label : "");
  };

  useEffect(() => {
    const selected = viewsItem.find((v) => v.value === viewAtual);
    setItemText(selected ? selected.label : "");
  }, [viewAtual]);

  const getUnidade = () => {
    switch (viewAtual) {
      case "month":
        return "month";
      case "week":
        return "week";
      case "day":
      case "agenda":
        return "day";
      default:
        return "month";
    }
  };

  const handleNavigate = (action) => {
    const current = moment(dataAtual);
    let novaData;

    switch (action) {
      case "TODAY":
        novaData = new Date();
        break;
      case "PREV":
        novaData = current.subtract(1, getUnidade()).toDate();
        break;
      case "NEXT":
        novaData = current.add(1, getUnidade()).toDate();
        break;
      default:
        novaData = dataAtual;
    }

    setDataAtual(novaData);
  };

  return (
    <div className="toolbar-container">
      <h1 className="mesAno">{label}</h1>
      <div className="dirtop">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {itemText}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {viewsItem.map((view, index) => (
              <li key={index}>
                <button
                  className="dropdown-item"
                  onClick={() => handleViewChange(view.value)}
                >
                  {view.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="toolbar-navigation" style={{ marginLeft: "15px" }}>
          <button
            className="btn btn-secondary btn-ls mr-2 border-0"
            onClick={() => handleNavigate("TODAY")}
          >
            Hoje
          </button>
          <button
            className="btn btn-sm mr-2 text-secondary"
            onClick={() => handleNavigate("PREV")}
          >
            <i className="bi bi-caret-left"></i>
          </button>
          <button
            className="btn btn-sm mr-2 text-secondary"
            onClick={() => handleNavigate("NEXT")}
          >
            <i className="bi bi-caret-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
