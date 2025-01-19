const { spawn } = require('child_process');
const path = require('path');

const microfrontends = ['host', 'auth', 'profile', 'places'];
const childProcesses = [];

microfrontends.forEach((microfrontend) => {

    const microfrontendPath = path.join(__dirname, microfrontend);

    const installProcess = spawn('npm', ['install'], { cwd: microfrontendPath, shell: true });

    // Установка зависимостей

    installProcess.on('close', (code) => {
    
        if (code != 0) {
            console.error(`Ошибка при установке зависимостей для ${microfrontend}:`, code);
            return;
        }

        console.log(`Зависимости установлены для ${microfrontend}:`, code);

        // Запуск микрофронтенда

        const child = spawn('npm', ['start'], { cwd: microfrontendPath, shell: true, detached: false });
        childProcesses.push(child);

        child.stdout.on('data', (data) => {
            console.log(`[${microfrontend}] ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`[${microfrontend} ERROR] ${data}`);
        });

        child.on('exit', (code) => {
            console.log(`${microfrontend} завершился с кодом ${code}`);
        });
    });
});

// Закрытие всех дочерних процессов при завершении родительского
process.on('exit', () => {
    childProcesses.forEach(child => {
        child.kill();
    });
});

process.on('SIGINT', () => {
    console.log('Завершение всех микрофронтендов...');
    childProcesses.forEach(child => child.kill());
    process.exit();
});
