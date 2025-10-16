import { Request, Response } from "express";
import { google } from "googleapis";

let serviceAccount: any;
try {
  const jsonString = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 || "", "base64").toString();
  serviceAccount = JSON.parse(jsonString);
} catch (err) {
  console.error("Failed to parse service account key:", err);
  throw new Error("Invalid Google service account key");
}

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
    const { id, title, start, end, allDay, location, colorId } = req.body;

    // Convert start/end to Date objects if they are strings
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    const eventData: any = { summary: title, location };

    if (allDay) {
      // all-day events: use exclusive end date
      const startStr = startDate.toISOString().split("T")[0];
      const endStr = new Date(endDate.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      eventData.start = { date: startStr };
      eventData.end = { date: endStr };
    } else {
      eventData.start = { dateTime: startDate.toISOString(), timeZone: "Europe/Brussels" };
      eventData.end = { dateTime: endDate.toISOString(), timeZone: "Europe/Brussels" };
    }

    if (colorId) eventData.colorId = colorId;

    const event = id
      ? await calendar.events.update({ calendarId, eventId: id, requestBody: eventData })
      : await calendar.events.insert({ calendarId, requestBody: eventData });

    res.json(event.data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const getNextEvent = async (req: Request, res: Response) => {
  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json(response.data.items ? response.data.items[0] : null);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
