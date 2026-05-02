# Notes App — Portable Desktop Build

## Requirements
- [Node.js](https://nodejs.org) v18 or later (LTS recommended)

## Build steps

1. Unzip this folder anywhere on your PC
2. Open a terminal inside the `notes-app` folder
3. Run:

```
npm install
npm run build
```

4. When done, find your portable exe at:
```
dist/Notes-portable.exe
```

Just double-click it — no installation needed. Copy it to a USB drive, another PC, anywhere.

## Development (live preview)

To run the app without building:
```
npm start
```

## Changing the icon

Replace `icon.ico` with your own 256x256 .ico file before building.
Free converter: https://convertio.co/png-ico/
