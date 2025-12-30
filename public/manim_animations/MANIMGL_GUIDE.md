# ManimGL Interactive Controls Guide

## How to Run Interactive Animations

### Basic Command:
```bash
manimgl interactive_apple.py InteractiveApple
```

## Interactive Controls

### Mouse Controls:
- **Left Click + Drag**: Rotate the scene
- **Right Click + Drag**: Pan/move the view
- **Scroll Wheel**: Zoom in/out
- **Middle Click**: Reset view

### Keyboard Controls:
- **Space**: Pause/Resume animation
- **Left Arrow**: Rewind 1 second
- **Right Arrow**: Skip forward 1 second
- **R**: Restart animation
- **Q**: Quit and close window
- **S**: Save screenshot
- **V**: Toggle video recording
- **D**: Toggle debug mode
- **F**: Toggle fullscreen

### Advanced Features:
- **Ctrl + Z**: Undo last action
- **Ctrl + Y**: Redo
- **1-9**: Jump to specific time markers
- **Tab**: Cycle through objects
- **Click on objects**: Select and manipulate

## Differences from Regular Manim:

1. **Import**: Use `from manimlib import *` instead of `from manim import *`
2. **Real-time**: Opens interactive window instead of rendering video
3. **Live editing**: Can modify code and reload without full re-render
4. **3D Support**: Better 3D rotation and viewing

## To Export Video from Interactive Session:
```bash
manimgl interactive_apple.py InteractiveApple -w
```
The `-w` flag writes the video file after interactive session.

## Tips:
- Start with low quality for faster interaction: `manimgl file.py Scene -l`
- Use high quality for final export: `manimgl file.py Scene -uhd`
- Combine interactive + export: `manimgl file.py Scene -w -p`
