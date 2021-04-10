# Purpose
Version 1: Provide capability to select calendars for a particular topic from various web sources into a single subscribable calendar.  Anyone can then subscribe to the aggregated calendar using their favorite calendar app using a URL.  They will then be able to view the events from the aggregagated calendar in their calendar app and can optionally display them along with their other personal and subscribed calendars.

Version 2: Provide query capabilities for any calendar by date, time of day, online/offline, location, tags, and other criteria.
# Technology
- Backend: Typescript, Express
- Front End: React, axios
- DB: TBD
- Deployment: TBD

# Development Approach
Use TDD to develop the backend.  To make sure database / data storage and backend are cleanly separated, only implement data storage after implementing the frontend and backend without permanent data storage.
Project Status
- [X] Understand webcal format (partially)

- [X] Define initial test strategy 
- [X] Define initial Object / Domain Model 
- [X] Select backend technology
- [X] Look for useful libraries or github projects (found ical.js library, evaluated node-ical.js, decided ical.js is better)
- [X] Create backend repository
- [ ] Implement backend functionality using Test Driven Development
  - started.  Implemented some tests, but revised test strategy, so redoing some of them, and many more to implement)
- [ ] Implement routes for anything needed by frontend
- [ ] Implement route for subscribing to a web calendar

- [X] Select frontend technology
- [ ] Define basic screens
- [ ] Create wireframes / figma
- [ ] Implement UI

- [ ] Implement data storage

- [ ] Deploy to github, Heroku, and/or Amazon

# How to Contribute
- Read documentation
- Backend
  - Identify a test to implement, work on a failing test
  - Understand webcal format by reviewing annoted_ics.md 
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
    
