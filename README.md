# Simple Discord.js v12 Bot 

## Edit Bot (`events/message.js`) - *Fill Yourself* *
- `Line 27` -> Command not found
- `Line 32` -> Command off
- `Line 38, 44, 50, 56, 62, 68, 74, 80` -> Dont has permission
- `Line 86` -> Only Author (`process.env.DISCORD_AUTHOR_ID`)

## Start Bot *
- Download repo
```bash
$ git clone Meska-Developer/simple-bot
```
- Open a file
```bash
$ cd simple-bot
```
- Fill in the blanks correctly
```dotenv
DISCORD_TOKEN=
DISCORD_PREFIX=
DISCORD_AUTHOR_ID=
DISCORD_CLIENT_ID=
DISCORD_PUBLIC_KEY=
DISCORD_CLIENT_SECRET_KEY=
```
- Update `.env-example` to `.env`
- Install required Packpages
```bash
$ npm i
```
- Start
```bash
$ npm run start
```
## Main File
- `./meska.js`

## Simple Command
- `./commands/avatar.js`

## Debug with VSCode (Windows)
* `F5` -> start
* `Shift + F5` -> stop
* `Ctrl + Shift + B` -> run build task
* `F9` -> toggle breakpoint
* `F10` -> step over
* `F11` -> step into
* `Shift + F11` -> step out

## Author : Arda Engin Ebcim aka Meska

### Note : Those with an `*` next to them are required.
