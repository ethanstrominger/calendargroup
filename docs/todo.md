**TO DO:**
- WIP: Test events with no timezone. Next: Refactor this (already green)
- Make the timezone test pass (currently red)
- Test event with only required fields
- Test that timezone details are included
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
- Try opening this project in Visual Studio
- Add Agenda TTS batch file to source control 
- Created Sample Aggregators json file
- Algorithm - Event fields to take/keep, etc.

**PROBABLY NOT, BUT MAYBE SOMETIME:**
- Try Autoformat feature in Excel on CSV