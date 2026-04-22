# Open Weather Project
This is a mini React + TypeScript project I followed and learnt from [Austin Davis](https://www.youtube.com/watch?v=M-iV9R3kLNA).

## Tech Stacks
- [TailwindCss 4](https://tailwindcss.com/)
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/installation#npm)
- [Zod](https://zod.dev)
- [OpenWeather](https://openweathermap.org/api/one-call-3?collection=one_call_api_3.0) -- used One Call API 3.0

## What I have learnt from this project

1. Type validation
From the tutorial, I learnt that every data we pass in should NOT have type of `any` because it can cause many potential issues for the app. (For example, runtime errors due to unexpected data structures.)
The tool I used to avoid this is called [Zod](https://zod.dev/api). Zod is a TypeScript-first schema validation with static type interface.

*In this project, I have taken the example of API response from OpenWeather, then used AI (ChatGPT) to convert it to ease the typing process.*

Before using Zod and defining a schema, in `api.ts`, we return data with type of `any`.
When using Zod, we use the defined schema and parse our data as in the example below.

``` ts
... code inside fn
  // parse into json
  const data = await res.json();
  // return data;  <- this is original return data that has type of any
  return weatherSchema.parse(data);
```