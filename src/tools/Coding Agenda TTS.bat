@echo off

echo ---

SET /A sixtySeconds = 60
SET /A _5MinuteTimeout = 5*sixtySeconds
SET /A _10MinuteTimeout = 10*sixtySeconds
SET /A _15MinuteTimeout = 15*sixtySeconds
SET /A _20MinuteTimeout = 20*sixtySeconds
SET /A _25MinuteTimeout = 25*sixtySeconds
SET /A _30MinuteTimeout = 30*sixtySeconds
SET /A _35MinuteTimeout = 35*sixtySeconds
SET /A _40MinuteTimeout = 40*sixtySeconds
SET /A _45MinuteTimeout = 45*sixtySeconds
SET /A _50MinuteTimeout = 50*sixtySeconds
SET /A _55MinuteTimeout = 55*sixtySeconds

SET /P "_Delay=Enter number of minutes until meeting will start: "
SET /A _MinutesUntilMeeting = %_Delay%*sixtySeconds
timeout %_MinutesUntilMeeting%

echo ---

call:speak "Time for Welcome and Chit Chat for 5 minutes"
timeout %_5MinuteTimeout%
echo . . .
call:speak "Time to Review Notes for 10 minutes"
timeout %_10MinuteTimeout%
echo . . .
call:speak "Time to Code for 25 minutes"
timeout %_25MinuteTimeout%
echo . . .
call:speak "Time for Retro for 5 minutes"
timeout %_5MinuteTimeout%
echo . . .
call:speak "Time to Code for 15 minutes"
timeout %_15MinuteTimeout%
echo . . .
call:speak "Time for Break for 10 minutes"
timeout %_10MinuteTimeout%
echo . . .
call:speak "Time to Code for 30 minutes"
timeout %_30MinuteTimeout%
echo . . .
call:speak "Time for Retro and Plannning for 15 minutes"
timeout %_15MinuteTimeout%
echo . . .
call:speak "Time for Closing for 5 minutes"
timeout %_5MinuteTimeout%
echo . . .
call:speak "Done"
echo :-)
echo . . .

echo ---


:Speak
(
 echo/Dim ProSpeak
 echo/Set ProSpeak = WScript.CreateObject^  ("SAPI.SpVoice"^)
 echo/ProSpeak.Speak "%~1"
) > proSpeak.vbs

echo/%~1

cscript //nologo proSpeak.vbs&del proSpeak.vbs

rem cls