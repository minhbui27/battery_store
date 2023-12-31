This is a programming challenge where I have to design a battery store.

This was tested on node v18.12.0 and npm v9.7.1

To install, git clone this repo and run

```
npm install
```

Then to start the development server, run
```
npm start
```

Requirements:

- The user should be able to enter the number of each device they want, and your
  UI should show the price, land dimension required and the sites energy density
- Assume that for every 4 industrial batteries bought 1 transformer is needed.
- The UI should also have an autogenerated layout showing an arrangement of
  batteries based on the user’s configuration
- The site layouts should not exceed 100ft in width
- If this project requires many things to work, ensure the whole app is runnable
  with one command.
- Make sure the front-end service runs on http://localhost:8000 when hosted
  locally

Stack:

- React
- Typescript
- Node

Important libraries I used:

- Material UI
- react-dnd
