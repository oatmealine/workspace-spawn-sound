const vscode = require('vscode');
const player = require('sound-play');
const { exec } = require('child_process');
const execPromise = require('util').promisify(exec);

function playSound(soundFile, volume) {
	if (process.platform == 'linux') {
		// sound-play doesn't support linux, so we're doing this manually
		execPromise(`play -v ${volume} "${soundFile}"`)
			.catch(err => {
				vscode.window.showErrorMessage(`Error playing ${soundFile}:\n\n${err}\n\nDo you have the sox package installed and in your PATH?`);
			});
	} else {
		player.play(soundFile, volume)
			.catch(err => {
				vscode.window.showErrorMessage(`Error playing ${soundFile}:\n${err}`);
			});
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Current workspaces:\n' + vscode.workspace.workspaceFolders
		.map(f => `- ${f.uri.toString()}`)
		.join('\n'));

	const cfg = vscode.workspace.getConfiguration('workspaceSpawnSound')
	
	const map = cfg.get('soundWorkspaceMap');
	const volume = cfg.get('volume');

	for (const [ pattern, soundFile ] of Object.entries(map)) {
		let regex = new RegExp(pattern);
		for (const folder of vscode.workspace.workspaceFolders) {
			if (regex.test(folder.uri.toString())) {
				console.log('Regex ' + pattern + ' matched, playing ' + soundFile);
				playSound(soundFile, volume);
			}
		}
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
