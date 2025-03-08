// components/MyCalendar.tsx
import { Calendar, momentLocalizer, Event as RBCEvent } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Necesario para que react-big-calendar maneje fechas con Moment
const localizer = momentLocalizer(moment);

// Tipo para los eventos en el calendario
interface RBCEventType extends RBCEvent {
  id: string;
}

// Props del componente: un array de eventos ya transformados
interface MyCalendarProps {
  events: RBCEventType[];
}

export default function MyCalendar({ events }: MyCalendarProps) {
  return (
    <div style={{ height: 500, marginTop: "1rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}
