# Purpose

Version 1

Provide capability to select calendars from various web sources into a single subscribable calendar. Anyone can then subscribe to the aggregated calendar using their favorite calendar app using a URL. They will then be able to view the events from the aggregagated calendar in their calendar app and can optionally display them along with their other personal and subscribed calendars. For version 1, web sources will only be calendars in ICAL format.

Version 2

Sources for events will include calendars in ical format (most web calendars), web scraping of event bright and other sources, and CSV files.

Version 3

Add query conditions to an aggregated calendar to only show events that match that criteria.

Criteria will include day of the week, time of day, online/offline, location, tags, and other criteria.

Version 4

Add query condition for an availability calendar.

# Technology

- Backend: Typescript, Express, Jest
- Front End: React, axios, Jest
- DB: To Be Determined
- Deployment: TBD

# Development Approach

Use TDD to develop the backend. To make sure database / data storage and backend are cleanly separated, only implement data storage after implementing the frontend and backend without permanent data storage. Scope of testing for front end UI is TBD - business logic

# Project Status

- [x] Understand ical format (partially)

- [x] Define initial test strategy
- [x] Define initial Object / Domain Model
- [x] Select backend technology
- [x] Look for useful libraries or github projects (found ical.js library, evaluated node-ical.js, decided ical.js is better)
- [x] Create backend repository
- [ ] Implement backend functionality using Test Driven Development
  - started. Implemented some tests, but revised test strategy, so redoing some of them, and many more to implement)
- [ ] Implement routes for anything needed by frontend
- [ ] Implement route for subscribing to a web calendar

- [x] Select frontend technology
- [ ] Define basic screens
- [ ] Create wireframes / figma
- [ ] Implement UI

- [ ] Implement data storage

- [ ] Deploy to github, Heroku, and/or Amazon

# How to Contribute

- Read documentation
- Backend
  - Identify a test to implement, work on a failing test
  - Understand ical format by reviewing annoted_ics.md
  - Deploy and develop
    - Select IDE or text editor
    - Install extensions useful for typescript and javascript
      ```
      adammaras.overtype
      cmstead.jsrefactor
      CoenraadS.bracket-pair-colorizer
      dbaeumer.vscode-eslint
      eamodio.gitlens
      esbenp.prettier-vscode
      mgmcdermott.vscode-language-babel
      stringham.move-ts
      VisualStudioExptTeam.vscodeintellicode
      ```
    - Install node
    - Clone or fork and clone backend repo
    - From project directory:

```
      npm install
      npm test
```
