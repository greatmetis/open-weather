import { z } from "zod"

export const weatherSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),

  weather: z.array(
    z.object({
      id: z.number().int(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),

  base: z.string(),

  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number().int(),
    humidity: z.number().int(),
    sea_level: z.number().int().optional(),
    grnd_level: z.number().int().optional(),
  }),

  visibility: z.number().int().optional(),

  wind: z.object({
    speed: z.number(),
    deg: z.number().int(),
    gust: z.number().optional(),
  }),

  rain: z
    .object({
      "1h": z.number().optional(),
    })
    .optional(),

  clouds: z.object({
    all: z.number().int(),
  }),

  dt: z.number().int(),

  sys: z.object({
    type: z.number().int().optional(),
    id: z.number().int().optional(),
    country: z.string().optional(),
    sunrise: z.number().int(),
    sunset: z.number().int(),
  }),

  timezone: z.number().int(),
  id: z.number().int(),
  name: z.string(),
  cod: z.number().int(),
});
