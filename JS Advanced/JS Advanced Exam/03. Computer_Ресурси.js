class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
    }

    installAProgram(name, requiredSpace) {
        if (requiredSpace > this.hddMemory) {
            throw new Error("There is not enough space on the hard drive");
        } else {
            const program = {
                name: name,
                requiredSpace: requiredSpace
            }
            this.installedPrograms.push(program);
            this.hddMemory -= requiredSpace;
            return program;
        }

    }

    uninstallAProgram(name) {
        for(let i = 0; i < this.installedPrograms.length; i++) {
            if (this.installedPrograms[i].name === name) {
                this.installedPrograms.splice(i, 1);
                return this.installedPrograms;
            }
        }

        throw new Error("Control panel is not responding");
    }

    openAProgram(name) {
        const existing = this.installedPrograms.find(p => p.name === name);
        if (existing === undefined) {
            throw new Error(`The ${name} is not recognized`);
        }
        const openedProgram = this.taskManager.find(p => p.name === name);
        if (openedProgram !== undefined) {
            throw new Error(`The ${name} is already open`);
        }

        let totalRamUsed = 0;
        let totalCpuUsed = 0;
        const ramUsed = (existing.requiredSpace / this.ramMemory) * 1.5;
        const cpuUsed = (existing.requiredSpace / this.cpuGHz / 500) * 1.5;

        (function calcRamCpu() {
            if (totalRamUsed + ramUsed >= 100) {
                throw new Error(`${existing.name} caused out of memory exception`)
            }
            if (totalCpuUsed + cpuUsed >= 100) {
                throw new Error(`${existing.name} caused out of cpu exception`)
            }

            totalRamUsed += ramUsed;
            totalCpuUsed += cpuUsed;
        })()

        const opened = {
            name: name,
            ramUsage: ramUsed,
            cpuUsage: cpuUsed
        }

        this.taskManager.push(opened);

        return opened;
    }

    taskManagerView() {
        if (this.taskManager.length == 0) {
            return "All running smooth so far";
        } else {
            let output = "";

            this.taskManager.forEach(p => {
                output += `Name - ${p.name} | Usage - CPU: ${p.cpuUsage.toFixed(0)}%, RAM: ${p.ramUsage.toFixed(0)}%\n`
            });

            return output.substring(0, output.length - 1);
        }
    }
}