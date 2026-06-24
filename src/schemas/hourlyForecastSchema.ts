import { z } from "zod";

export const hourlyForecastSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number().int(),

  list: z.array(
    z.object({
      dt: z.number().int(),

      main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
        pressure: z.number().int(),
        sea_level: z.number().int(),
        grnd_level: z.number().int(),
        humidity: z.number().int(),
        temp_kf: z.number(),
      }),

      weather: z.array(
        z.object({
          id: z.number().int(),
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),

      clouds: z.object({
        all: z.number().int(),
      }),

      wind: z.object({
        speed: z.number(),
        deg: z.number().int(),
        gust: z.number().optional(),
      }),

      visibility: z.number().int(),
      pop: z.number(),

      rain: z
        .object({
          "1h": z.number().optional(),
        })
        .optional(),

      sys: z.object({
        pod: z.string(),
      }),

      dt_txt: z.string(),
    })
  ),

  city: z.object({
    id: z.number().int(),
    name: z.string(),

    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),

    country: z.string(),
    population: z.number().int(),
    timezone: z.number().int(),
    sunrise: z.number().int(),
    sunset: z.number().int(),
  }),
});

