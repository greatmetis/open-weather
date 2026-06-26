import { z } from "zod"

// export const weatherSchema = z.object({
//   lat: z.number(),
//   lon: z.number(),
//   timezone: z.string(),
//   timezone_offset: z.number(),
//   current: z.object({
//     dt: z.number(),
//     sunrise: z.number(),
//     sunset: z.number(),
//     temp: z.number(),
//     feels_like: z.number(),
//     pressure: z.number(),
//     humidity: z.number(),
//     dew_point: z.number(),
//     uvi: z.number(),
//     clouds: z.number(),
//     visibility: z.number(),
//     wind_speed: z.number(),
//     wind_deg: z.number(),
//     wind_gust: z.number().optional(),
//     weather: z.array(
//       z.object({
//         id: z.number(),
//         main: z.string(),
//         description: z.string(),
//         icon: z.string(),
//       })
//     ),
//   }),
//   hourly: z.array(
//     z.object({
//       dt: z.number(),
//       temp: z.number(),
//       feels_like: z.number(),
//       pressure: z.number(),
//       humidity: z.number(),
//       dew_point: z.number(),
//       uvi: z.number(),
//       clouds: z.number(),
//       visibility: z.number(),
//       wind_speed: z.number(),
//       wind_deg: z.number(),
//       wind_gust: z.number(),
//       weather: z.array(
//         z.object({
//           id: z.number(),
//           main: z.string(),
//           description: z.string(),
//           icon: z.string(),
//         })
//       ),
//       pop: z.number(),
//     })
//   ),
//   daily: z.array(
//     z.object({
//       dt: z.number(),
//       sunrise: z.number(),
//       sunset: z.number(),
//       moonrise: z.number(),
//       moonset: z.number(),
//       moon_phase: z.number(),
//       summary: z.string(),
//       temp: z.object({
//         day: z.number(),
//         min: z.number(),
//         max: z.number(),
//         night: z.number(),
//         eve: z.number(),
//         morn: z.number(),
//       }),
//       feels_like: z.object({
//         day: z.number(),
//         night: z.number(),
//         eve: z.number(),
//         morn: z.number(),
//       }),
//       pressure: z.number(),
//       humidity: z.number(),
//       dew_point: z.number(),
//       wind_speed: z.number(),
//       wind_deg: z.number(),
//       wind_gust: z.number(),
//       weather: z.array(
//         z.object({
//           id: z.number(),
//           main: z.string(),
//           description: z.string(),
//           icon: z.string(),
//         })
//       ),
//       clouds: z.number(),
//       pop: z.number(),
//       rain: z.number().optional(),
//       uvi: z.number(),
//     })
//   ),
// })

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

  visibility: z.number().int(),

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
