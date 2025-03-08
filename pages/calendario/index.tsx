// pages/calendario/index.tsx
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Cargamos el componente del calendario de forma dinámica, desactivando SSR
const MyCalendar = dynamic(() => import("./components/MyCalendar"), {
  ssr: false,
});

interface Event {
  _id: string;
  title: string;
  description?: string;
  dateStart: string;
  dateEnd: string;
}

export default function CalendarioPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
  });

  // Al montar, pedimos la lista de eventos
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.data);
        }
      });
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Crear evento al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    const data = await res.json();

    if (data.success) {
      // Añadir el nuevo evento a la lista
      setEvents([...events, data.data]);
      // Limpiar el formulario
      setNewEvent({ title: "", description: "", dateStart: "", dateEnd: "" });
    }
  };

  // Convertir los eventos de Mongo a formato que react-big-calendar entiende
  // { id, title, start, end }
  const rbcEvents = events.map((ev) => ({
    id: ev._id,
    title: ev.title,
    start: new Date(ev.dateStart),
    end: new Date(ev.dateEnd),
  }));

  return (
    <section>
      <h1>Organizar Partidas</h1>

      {/* Formulario para crear evento */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={newEvent.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Descripción (opcional)"
            value={newEvent.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha/hora inicio</label>
          <input
            type="datetime-local"
            name="dateStart"
            value={newEvent.dateStart}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha/hora fin</label>
          <input
            type="datetime-local"
            name="dateEnd"
            value={newEvent.dateEnd}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear evento</button>
      </form>

      {/* Calendario */}
      <MyCalendar events={rbcEvents} />
    </section>
  );
}
