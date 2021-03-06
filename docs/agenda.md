**Meeting/Agenda**

**BEFORE MEETING**

- **Ethan:** 
  - Prep with specific background so that we can jump in on a new red-green-refactor with a clear requirement (and clear description of dependencies)
  - Check branches, push, & verify changes appear on GitHub
  - Close all applications (especially VS Code)
  - Have snack and water on hand before meeting (if will need)
  - Turn off Slack
  - Set keyboard (for use with Windows remotely)
  - Discuss staying alert (snacks, standing,...)

- **Joel:** 
  - Open timers (and modify if needed) (https://mobti.me/arrested-egg and TTS agenda timer)
  - Open VS Code 
  - Pull (usually from main branch)
  - Open Git Bash Terminal in VS Code and enter:
    - yarn install
    - yarn test
    - yarn test --watch
  - Arrange windows (MobTi.me top left, VSCode right fill)

- **Key Reminders / New Agreements:**
  - Prefer start on new Red Green Refactor (rather than debugging/fixing unfixed red test from previous session or between-session non-pair coded changes). 
  - Otherwise:
    - 1. Unfamiliar person describes what's going on and
    - 2. Refactor & simplify for understanding as we go (rather than waiting for getting to green)

**AGENDA (during meeting)** 

Before Starting Project:

- Pull (get latest) and **make sure working in correct branch!** (verify Git History shows expected checkins from week)
- npm install (in case packages added)

- Review:
  (1) Previous Retro 
  (2) TDD and End of Session steps (see details below)

- Set Timers for
  (1) Mob Timer (https://mobti.me/arrested-egg) (edit Navigator to say "Navigator (Stand)")  
  (2) Agenda Timer(s): e.g., use TTS Batch File (so can hear next agenda item out loud)
          Item	       Len	 Start
          Welcome	      5	 9:30 AM
          Review Notes 10	 9:35 AM
          Coding w/TDD 25	 9:45 AM
          Retro	        5	10:10 AM
          Coding	     15	10:15 AM
          Break        10	10:30 AM
          Coding	     30	10:40 AM
          Retro+Plan   15	11:10 AM
          Closing	      5	11:25 AM

- Have co-author string ready:
        ``
        Co-authored-by: Ethan Strominger <ethanstrominger@gmail.com>
        or
        Co-authored-by: Joel Silberman <jcsilbermam@gmail.com>
        ``
- Start reviewing this doc within 5 min. of session start time and coding within 10-15 min.
  - Prefer to start with a coding task and get through red-green-refactor (full cycle)
  - Arrange times to talk about outside projects, etc. (e.g., Reach for Help)
  - Be prepared to time how much time we're coding & try to increase - record real 
    (red-green-refactor) coding
  - Avoid research (non-TDD work) until after the break (to make sure we do full-cycle TDD asap)
  - When coding: Start on greenfield task as much as possible and if not, start by having the unfamiliar person describe what's going on and refactor & simplify for understanding as we go (rather than waiting for getting to green)

TDD Cycles:

- Requirement - determine the simplest requirement to move forward
- Red - write a failing test
- Green – write the simplest code to pass
- Commit – save to local repository
- Refactor - improve the code without changing or introducing new behavior (or explicitly state if you don't see anything to refactor)
- Commit and Push – save to remote common repository

**Agreements (evolve as needed):**

- Code by intent – let the tool create classes, variables, etc.
- Bias toward action - let people try things rather than having long debates and speculation; if needed, try it multiple ways and see how it works; always get at least one test done and working at every meeting as a bare minimum (full cycle of red-green-refactor, etc.)
- Retrospectives - after every _30_ minutes on what we learned & liked, and proposed changes (e.g., modifying agreements, processes, etc., as appropriate) (remember to set recurring timer)
- Rotations
  – Rotate roles (driver, navigator, etc.) - after each green (red-green or refactor-commit) up to a max of _5_ minutes
  - Stand every rotation (optionally stand while navigating)
- Breaks – e.g., every _60_ min. (+/-) (remember to set timer)

**IntelliJ Shortcuts:**

- Double Shift - Search Everywhere in IntelliJ
- Ctrl+K - Commit
- Shift+F10 - Run All (in SimpleCarJava)

**VS Code Shortcuts:**

- F8 - Go to next problem
- Ctrl+Shift+P, F1 - Show Command Palette

**End of Session:**

- **Update log of when started coding** (time and h:mm from start time):
  - 3/25/2021: 10:55 AM (1:25 from start)
  - 4/22/2021: 9:45 AM (0:15 from start paired on algorithm edits; 1:30 from start paired on TDD) 
  - 4/29/2021: 10:05 connected, 10:18 looked at code, 10:22 started coding
  - 5/3/2021: staggered start, did a little at 9:45 AM, then explanation, then resumed around 10:00 AM
  - 5/13/2021: 9:47 (but not real full-cycle TDD coding)
  - 5/20/2021: 9:48 (but not real full-cycle TDD coding)
  - 5/27/2021: 9:55 (tried but didn't quite get through one full cycle; we got to green but didn't finish refactoring, and didn't create a new red test; i.e., out of the 3 steps, we did 1.2 approx. [the green step was completed and we did about 20% of the refactoring step])
  - 6/3/2021: 9:49 (spent a lot of time trying to understand the code and refactor it for better understanding, including commenting the bizarre behavior of ICalCalendar expecting incorrect JS Dates)
  - 6/24/2021: 10:35 (late start because: not on right branch to start, confused about the nature of what was planned to start on, problems opening files in expect tabs,...)
  - 7/8/2021: N/A started late intentionally so could do larger retro/planning (and we actually did do coding after a 10:25 break)
  - ...
- **(Stage,) Commit, & Push** - so everyone has the latest code before leave
