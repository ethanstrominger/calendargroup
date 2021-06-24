**TO DO:**
- Figure out how to open files in new tabs rather than replace tabs
- This session:
  - See other comments for refactorings
  - Refactor tests to use test.each (data driven)
  - Add recurring event
  - Add change to one occurence of a recurring event (not all, just the one)  
- Add gated checkins
- Add to Agenda TTS batch file: **TTS End of Session reminders**
- Modify **mob timer** source code to add "stand" reminder (1) text, (2) text to speech (TTS) 
  [and consider other improvements]
- Add **license**
- JOEL: VS issues 
    - Powershell Window:
        - Searching
    - Test Explorer (if not working well, we can use powershell instead):
        - didn't see all the tests (might need to change the config path or add?...)
        - need to compile before run (or is there a setting to fix this?)
        - it.skip caused failures rather than skips
        - didn't see details of the failures
    - Takes a long time to load when open VS
    - Need to see what advantages are (e.g., if get Test Explorer working well;...)
    - Auto-save (check settings)

**DONE:**
- Replace EventData object with AggEventSource object (no need for both; latter is better)
- Make the timezone test pass
- Test event with only required fields
- Test that timezone details are included
- Test events with no timezone
- Try opening this project in Visual Studio
- Add Agenda TTS batch file to source control 
- Created Sample Aggregators json file
- Algorithm - Event fields to take/keep, etc.

**PROBABLY NOT, BUT MAYBE SOMETIME:**
- Try Autoformat feature in Excel on CSV