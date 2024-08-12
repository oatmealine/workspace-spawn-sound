# Workspace Spawn Sound

Simply plays a sound whenever you open a configured workspace.

> [!IMPORTANT]
> On **Windows**, this uses `powershell` to play the sound.\
> On **OSX**, it uses `afplay`.\
> On **Linux**, this uses the `sox` package's `play` command, so make sure
> to have it installed and in your PATH for this extension to work.

## Configuration

Configuration is done manually through your `settings.json`. Example:

```json
{
  "workspaceSpawnSound.soundWorkspaceMap": {
    "file:///home/oatmealine/git/openitg": "/home/oatmealine/storage/malachite.wav"
  },
  "workspaceSpawnSound.volume": 0.5
}
```

The keys of `soundWorkspaceMap` are RegExp patterns matching the workspace URI,
and the values are absolute filepaths. Files should ideally be `.wav`, `.mp3` or
`.ogg`, I cannot guarantee platform compatility for any other filetype.