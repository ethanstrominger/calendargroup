TO START EACH RETRO, ASK:
- "Did we do any rounds of red-green-refactor [RGR] and when did that really start?"
  (And write down when/if that happened)

6/17/21 - Ethan & Joel

2nd Retro

Improve
- Don't use reset. Use revert instead. (Improve use of GitHub to rollback changes)
- Add gated checkins (i.e., prevent commit when tests are failing)
- Ethan close local copy of VS Code (so don't confuse it with remote copy on Joel's PC)

Feel
- Unhappy, frustrated

Like
-

1st Retro

Improve
- pushing and pulling green right from the get go
- before meeting: test after push and/or after commit
- speak up as navigator if not want to do a suggestion and move on
- bias towards action, try do some coding every turn

Feel
- aggravated

Like
- started with refactoring, made sure we were green
- disagree - trying to invoke/determine rule

5/27/21 - Ethan & Joel 

2nd Retro 

Improve
- Joel: Wants to understand (or at least try walking through and explaining himself) all the code in the test and paths through the production code (and refactor as we go for undertandability: fewer lines, less duplication, more digestible). Start with with this refactoring for understandability rather than waiting to get to green.
Feel
- Somewhat disappointed but not resigned
- Stuck
Like
- Small amount of refactoring and simplification (e.g., only needed one event not two for a particular test) for ease of understand. Do more!!!
- Configuring jest to run just the test(s) we wanted, e.g.: npm test -t Util

1st Retro

Improve
- Start on greenfield task as much as possible and if not, start by having the unfamiliar person describe what's going on.
- Joel: get **Git Client** (has unix, can search etc. - replaces command prompt); when use, document which commands are used
Feel
- Frenetic
- Mix of hope and dread
Like
- Prepped ahead of time, so could readily update to-do list with clear tasks 
- Agenda checklist before meeting items




5/20/21 - Ethan & Joel
Improve
- Add to agenda before start coding: check Git History to make sure have pushed what expected previously
- Revisit bolding in the agenda
- Start real coding at least by after the break (10:40)
- Agenda: Start every retro with: "Did we code (did rounds of red-green-refactor [RGR]) and when did that 
    really start?" And record it / revise it. Always do RGR first and anything else after that if time permits
    (i.e., allocate specific time in 2nd half for research, but skip if no RGR completed).
- VS issues 
    - Powershell Window:
        - Searching
    - Test Explorer (if not working well, we can use powershell instead):
        - need to compile before run (or is there a setting to fix this?)
        - it.skip caused failures rather than skips
        - didn't see details of the failures
    - Takes a long time to load when open VS
    - Need to see what advantages are (e.g., if get Test Explorer working well;...)
    - Auto-save (check settings)

Feel
- 1st retro: 
    - Calm (somewhat), neutral
    - +1
- 2nd retro:
    - Aggravated

Liked
- Got build to work in VS; and didn't take too long to figure out that didn't push before meeting
- Trying VS (instead of VS Code) 


5/13/21 - Ethan & Joel
Improve
- Figure out system for synching code before we meet - add to agenda to check branches,...
- Ethan prep with specific background so that we can jump in on a new red-green-refactor with a clear requirement (and clear description of dependencies)
- Check in agenda timer batch file and Excel file; and improve (i.e., not batch)
- Add to agenda: Set up command prompt window (placed under mobtimer window) with:
  - dir ____ (path)
  - npm test
Feel
- Guilty, bemused
- Perplexed, frustrated, glad
Liked
- Worked through the issues
- Working on real project
- Liked that figured out branch problem
- Liked getting environment more set up ahead of time
- Liked making sample text files visible and adding to project


5/3/21 - Ethan & Joel
Improve 
- Rename ICalUtil to ICalSerializer, change to class, and maybe rename method to Deserialize (to make consistent with other serializers); or maybe see if something on top of the parser works the way we want
- Make sure understand the code that we're working on before starting
- Try to get a full cycle red-green-refactor each session
- Use separate terminal for running tests so can tell more clearly which test failed without scrolling; maybe switch to Visual Studio
- Between sessions: 
  - Look at error message for failing test, even if it's the same test that's failing
  - Ethan: Eat first thing
- Record when start coding in the beginning
Feel
- Part 1:
  - Bad, guilty, hungry
  - Joel: Surprising less tired (2 days after 2nd Pfizer shot)
- Part 2:
  - Less hungry, kind of happy (tentatively happy)
  - Surprised (that ical parser doesn't do whole job for you with serialize/deserialize - or maybe we missed something?)
  - Disappointed (didn't get test working that was failing before started session)
Liked
- Chance to explain project prep for MVP
- TTS Agenda working! (It tells us what we're doing, not just a gong or other sound), and made a copy and ran it to rejigger the timings after an unusually early break
- Mob timer window at left - visible at all times
- Seeing code and test side-by-side in IDE
- Refactored the test

4/29/21 - Ethan & Joel
Improve
- Figure out how to run just the failed test(s)
- To avoid slowdowns: Write down what learned (especially if worked independently). Better to work together.
Feel
- Reflective
- Tired
- Disappointed (didn't get full red green refactor cycle done; but at least we tried / coded a lot)
- End of meeting: Hungry, unsatisfied (wanted to get further), frustrated
- Glad to figure out npm install problem (was frustrating)
Liked
- Retro
- Started coding soon in meeting
- Lots of coding
- Changed autosave settings (no longer save after delay; now save when change focus from file to file)

4/22/21 - Ethan & Joel
Improve
- Do some code
Feel
- Good, positive, cheerful
- Good, relieved
- Inquisitive
Liked
- Using timer flexibly when editing algorithm
- Doing the algorithm
- Quick start
- Explaining text if not author
- Knowing there are generators and parser
- Did some code
- Updated todo at end of session with current progress and next step 

4/15/21 - Ethan & Joel
Liked
- Having person who didn't write the documentation read and explain it to the person who did - and modify/improve at the same time.
- Learned more about ICS format.

3/25/21 - Ethan & Joel
Improve
- Try Autoformat feature in Excel on CSV
- Deferred push of Java Car notes.md
- Break should be exactly at 10:30
Liked
- Saved Excel formatting in separate file for reuse (with CSV)
- Test descriptions 
    - Were ready in spreadsheet 
    - Good to review for clarity
- Split notes.md into 3 documents (finally)
- Implemented getByUiid
 
 ------------------

Retro History

3/16/21 - Ethan & Joel
Improve
- Agenda Timer not working right - slow? (https://www.timeblocks.co/)
- DONE: VS Code add-in(s) to make more like full IDE with better refactoring tools, etc.
- Add project setup instructions
- Discuss more how to write 1st test together in newly set up project
Liked
- We got a new class implemented in js together! (red green refactor commit push!)
- Agenda timer (https://www.timeblocks.co/)
- Successfully set up calendar project on Joel's PC 
- Used mob timer even though Ethan had to navigate mostly (only one who knew)


RETRO IMPROVEMENTS:
- 3/11/2021:
  - (Some discussion of how to get up and running faster with new JavaScript project; ultimately decided 
    to just use Ethan's existing calendar js project to do our SimpleCar js sample code next time)
- 3/4/2021:
  - Time how much time we're coding & try to increase
  - Later: ideas - modify mob timer to add TTS ("stand" reminder, etc.)
- 2/25/2021
  - Stand every rotation (optionally stand while navigating) 
    (Help manage energy level in meeting)
  - Figure out how Ethan can right-click remotely
  - Ethan: Turn off Slack

- 2/18/2021:
  - Try retros every 30 min (timer loops every 35 min) - even if not coding
  - Ethan have snack and water on hand before meeting
  - Start the project within 5 minutes of session start time. 
      - Prefer to start with a coding task and get through red-green-refactor (full cycle)
      - Arrange times to talk about outside projects, etc. (e.g., Reach for Help)

GOOD / keep doing: 
- 3/11/2021:
  - Started project quickly
  - Used cyber-dojo for sample js test code
  - Set up 3 named timers before meeting (break, retro, wrap-up)
  - Doing setup in which only one person knew what to do, we still switched off but knowledgable driver just said aloud what doing
  - Set within-retro timer for 5 min.
- 3/4/2021:
  - standing (and adding "stand" to the mob timer for navigator)
  - finished Java car project and set up start of JavaScript project, and consolidated into single repository
  - snacks
- 2/25/2021:
    - Snack
    - Notes for what to do at start of meeting
    - Mob timer & switching every 5 min. 
- 2/18/2021:
    - Not using Zoom remote control
    - Using GitHub and typing on own computer
    - AnyDesk (Ethan likes it)
    - Alt-drag mouse works to select vertically in a file
    - Rotate on green (after red-green or after refactor-commit) (mob timer 5 min. as backup max. time)
    - Using google for syntax and taking the simplest one
- 2/4/2021:
    - Added TDD pre-step: Determine the simplest requirement to move forward
    - Got tests done; did TDD (all steps), took turns
    - Discussed expectations in beginning
    - Expected complexity
