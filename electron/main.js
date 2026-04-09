import { app, BrowserWindow, net, protocol } from 'electron';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// 加载同目录下的 index.html
	mainWindow.loadURL('app://bundle/');

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

protocol.registerSchemesAsPrivileged([
	{
		scheme: 'app',
		privileges: {
			standard: true,
			secure: true,
			supportFetchAPI: true,
			stream: true,
		},
	},
]);

app.whenReady().then(() => {
	protocol.handle('app', async (req) => {
		const { host, pathname } = new URL(req.url);
		if (host === 'bundle') {
			if (pathname === '/') {
				return net.fetch(pathToFileURL(path.resolve(__dirname, 'index.html')).toString());
			}
			// pathname 是 /assets/xxx.js，需要去掉开头的 /
			const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
			const pathToServe = path.join(__dirname, cleanPath);
			const relativePath = path.relative(__dirname, pathToServe);
			const isSafe = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
			if (!isSafe) {
				return new Response('bad request', {
					status: 400,
					headers: { 'content-type': 'text/html' },
				});
			}
			try {
				const response = await net.fetch(pathToFileURL(pathToServe).toString());
				if (response.status === 404) {
					return new Response(null, {
						status: 302,
						headers: { Location: 'app://bundle/' },
					});
				}
				return response;
			} catch {
				return new Response(null, {
					status: 302,
					headers: { Location: 'app://bundle/' },
				});
			}
		} else {
			// 重定向到首页
			return new Response(null, {
				status: 302,
				headers: { Location: 'app://bundle/' },
			});
		}
	});

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
