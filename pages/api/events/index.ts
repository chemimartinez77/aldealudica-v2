// pages/api/events/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      // Listar todos los eventos
      try {
        const events = await Event.find().sort({ dateStart: 1 });
        return res.status(200).json({ success: true, data: events });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

    case "POST":
      // Crear un evento
      try {
        const { title, description, dateStart, dateEnd, createdBy } = req.body;
        const newEvent = await Event.create({
          title,
          description,
          dateStart,
          dateEnd,
          createdBy,
        });
        return res.status(201).json({ success: true, data: newEvent });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      // Método no soportado
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
