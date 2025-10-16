import { Request, Response } from "express";
import { google } from "googleapis";

const serviceAccountJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64!, 'base64').toString();
const serviceAccount = JSON.parse(serviceAccountJson);

const calendarId = process.env.CALENDAR_ID || "ambras.parkour@gmail.com";

const auth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

export const getEvents = async (req: Request, res: Response) => {
  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json(response.data.items);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createOrUpdateEvent = async (req: Request, res: Response) => {
  try {
    const { id, title, start, end, allDay, location } = req.body;

    const eventData: any = {
      summary: title,
      start: allDay ? { date: start } : { dateTime: start },
      end: allDay ? { date: end } : { dateTime: end },
      location,
    };

    let event;
    if (id) {
      event = await calendar.events.update({
        calendarId,
        eventId: id,
        requestBody: eventData,
      });
    } else {
      event = await calendar.events.insert({
        calendarId,
        requestBody: eventData,
      });
    }

    res.json(event.data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
