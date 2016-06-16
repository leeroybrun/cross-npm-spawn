# cross-npm-spawn
Cross-platform NPM spawn

## Installation

```
npm install cross-npm-spawn
```

## Usage

### `spawnNpm(command, npmArgs, spawnArgs)`

#### Params
- **String** `command`: The npm command (e.g. `'install'`).
- **Object** `npmArgs`: An object parsed by [`dargs`](https://www.npmjs.com/package/dargs).
- **Object|String** `spawnArgs`: The spawn options object or just the working directory where to run the command.

#### Return
- **Promise** A promise that if resolved will returns an object with the following properties :

```
{
  code: Integer,  // Return code of the NPM command. 0 if success, 1 if an error occured
  stdout: String, // stdout of the NPM command
  stderr: String  // stderr of the NPM command
}
```

## Example

    const spawnNpm = require('cross-npm-spawn');

    // Will execute the "npm show express version" command
    const promise = spawnNpm('show', {_: ['express', 'version']}).then((result) => {
      console.log('Return code : ', result.code);
      console.log('Stdout : ', result.stdout);
      console.log('Stderr : ', result.stderr);
    }).catch((reason) => {
      console.log('An error occured while executing the NPM command.', reason);
    });
