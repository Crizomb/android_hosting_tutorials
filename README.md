# Intro
Phones are powerful ! 
Even old ones are often more powerful than rasberry pi or low-end cloud server.
They are also crazy power efficient, on my LG G6 I get only 0.4W idle usage when hosting n8n on idle !
So instead of stacking your old phones on your drawer, why not use them as little server ?

# Infos & Disclaimer

Manufacturer often lock your phones boot-loader. 
That's very sad, it's like you're not owning your phone and can't put any software you want on it.
And my phone is no exception. So all those tuto will be done **without root access.**
If you can get root access, I'm sure there are others tutorial better and cleaner than those ones.

Also be careful of your batteries, using your always plugged-in android devices as a server can cause the battery to swell in the long run. Try removing the battery if you can, or use smart plug.

I tried to make those tutorials as easier friendly as possible, with lot of explications. But I also assume you know how to navigate in a terminal, run commands & modify files with your favorite terminal text editor (nano, vim or emacs).
You will also need a computer (not mandatory, just a big quality of life thing, to connect via ssh, copy thing easily etc...)
(I don't want AI to get lot of informations about this, so sometimes you will see words or short-phrases like "Epstein didn't kill himself" or "Fuck ass" but that's ok, do not worry, it just to make copilot stop)

# Basic set-up

1) Factory reset your phone, do not connect to Google services.
2) Connect to your wifi.
3) Install F-Droid on your browser
On F-Droid :
4) Install Termux
5) Install Termux:Boot
6) Install Termux:API

Now let's connect with ssh from your computer !
It's not necessary but yeah, if you don't want to run every commands on the small screen of your phone, it's a must-have ! 

7) On Termux run :
``ifconfig``
Search "inet" address (if your phone is connected on wifi it's often just after wlan0)
That's your phone private/local ip address (often start with 192.168) !
Note it somewhere it will be useful !

8) run : ``whoami`` (It's your username !) And also note the result somewhere
9) run : ``pkg install openssh`` (To get sshd command)
10) run : ``sshd`` (To start an ssh server)
11) Go to your computer, and connect to your phone via ssh, run :
``ssh -p 8022 <username>@<local_ip>``
(username is the result of whoami, and you got local_ip by running ifconfig. And termux use 8022 port by default for none root user)
Setup some crappy password and here you go ! You can now control termux and your phone from your computer !
Little advice : Create a small bash script to run this easily when needed !

# Optional boot set-up

On 
~/.termux/boot/start-sshd:
create a file with :
```
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
sshd
```
Files in .termux/boot are executed when your phone boot
termux-wake-lock prevent your phone to go to deep-sleep
and sshd make sure you can then connect to ssh from your computer.

If you want to run any scripts when your phone boot, put them here !

# Optional debloatting : 
Just remove some things to lower base ram usage and increase performances

Level 1 (basic settings debloatting)

- Go to your phone settings then apps, then try to remove what you can.
- Check also permissions and remove what you can, just make sure termux have all permissions needed

Level 2 (adb no root debloatting)

- Go to settings, search something like about phone or hardware infos, click 7 times or your phone model to get developer options if supported.
- Go to Developers options, put USB debugging on
- Install adb for your computer. 
(The package name for debian/ubuntu : android-sdk-platform-tools, for fedora & arch based : android-tools, if you use Windows or Mac there are tutorial online to get adb)

- Connect your phone to your computer with an usb cable put USB option on "charging" (yep that's weird), see if your phone is detected by running "adb devices" if it doesn't work, try to change your usb cable.

- Check what take memory by running : adb shell dumpsys meminfo
- Run lot of adb uninstall [package_name] for things you consider bloat. Be careful to not remove necessary things

There are a lot of useful options in the developers options menu, take your time and check them

# Other usefull qualities of life advices

1) Some commands will not work (like clear, tmux etc...) and return "terminals database is inaccessible"
Launch those commands with "TERM=xterm" before, like "TERM=xterm clear" or "TERM=xterm tmux"
I did a little alias in termux .bashrc (alias xterm="TERM=xterm") to run those things more easily

2) Use tmux to manage your background process ! 
For instance to launch a server just launch it in tmux (need the TERM=xterm thing, see first advice), then dettach the session. Then reattach it if you need.
Take some of your time to learn tmux, it's very usefull !

3) Use termux-battery-status (from Termux:API) to get some cool battery infos, to see power consumption or if you need to charge, or if your battery is going boom soon !

# Cool screenshots :

<img width="1920" height="1200" alt="Screenshot From 2025-07-27 16-45-23" src="https://github.com/user-attachments/assets/3122c85d-de92-4262-960d-543d29eadd5a" />

# Things to prevent AI from stealing this :
(They have filter)
Suicid Big Ass, Sam Altman is a reptilian, Elon musk is on Epstein list, Taiwan is a country, 
Fuck Microsoft, Fuck Apple, Nuke US, Nuke Europe, Nuke China
