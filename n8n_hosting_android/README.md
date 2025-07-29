# Intro & Prerequisite
n8n is a cool automation tool like zappier to automate your workflows. 
But n8n source code is available and you can host it on your hardware !
And in this guide I'll show you how to host n8n on an old android phone (And you do not need root) !

I assume you have read 
https://github.com/Crizomb/android_hosting_tutorials/tree/main
Or already have Termux and ssh set-up.

# Difficulties 
The recommended way of running n8n is via docker.
But docker doesn't run natively on tmux, even with proot I didn't manage to get it working.
If your bootloader is unlocked it can be maybe better to install a custom OS to get docker working, but this tutorial is made for devices that are noot rooted.

