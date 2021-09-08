const fs = require('fs');
const readline = require('readline');
const { input_file, output_file } = require("./commandParser");

const rl = readline.createInterface({
    input: fs.createReadStream(input_file),
    output: process.stdout,
    terminal: false
});

var lines = [];

var robots = [];

rl.on('line', (line) => {
    lines.push(line.toString());
}).on('close', () => {
    const maxRightCoord = lines[0].split(/\s+/)[0];
    const maxUpperCoord = lines[0].split(/\s+/)[1];
    var scent = [];

    if (maxUpperCoord > 50 || maxRightCoord > 50) {
        console.log('Maximum coordinate value is 50');
        process.exit();
    }

    for (var i=1; i<lines.length-1; i+=2) {
        var robotXCoordinate = Number(lines[i].split(/\s+/)[0]);
        var robotYCoordinate = Number(lines[i].split(/\s+/)[1]);
        var robotOrientation = lines[i].split(/\s+/)[2];
        var instructions = lines[i+1].split('');
        var lost = false;
        var lostString = '';

        if (robotXCoordinate > maxRightCoord || robotYCoordinate > maxUpperCoord || robotXCoordinate < 0 || robotYCoordinate < 0) {
            console.log('The position of the robot is outside of the grid');
            process.exit();
        }

        if (robotOrientation != 'N' && robotOrientation != 'E' && robotOrientation != 'W' && robotOrientation != 'S') {
            console.log('The orientation is not valid, it only can be "N", "E", "W" or "S"');
            process.exit();            
        }

        if (instructions.length > 100) {
            console.log('The maximum length of the instruction set is 100');
            process.exit();            
        }

        movementManager();

        if (lost == true)
            lostString = 'LOST';
        
        robots.push([robotXCoordinate, robotYCoordinate, robotOrientation, lostString]);

        writeResult();

        rl.close();
        rl.removeAllListeners();
            
    }


    function movementManager() {
        instructions.forEach(instruction => {
            if (!lost) {
                if (instruction == 'R') {
                    if (robotOrientation == 'N')
                        robotOrientation = 'E';
                    else if (robotOrientation == 'E')
                        robotOrientation = 'S';
                    else if (robotOrientation == 'S')
                        robotOrientation = 'W';
                    else if (robotOrientation == 'W')
                        robotOrientation = 'N';
                }
                else if (instruction == 'L') {
                    if (robotOrientation == 'N')
                        robotOrientation = 'W';
                    else if (robotOrientation == 'E')
                        robotOrientation = 'N';
                    else if (robotOrientation == 'S') 
                        robotOrientation = 'E';
                    else if (robotOrientation == 'W') 
                        robotOrientation = 'S';
                }
                else if (instruction == 'F') {
                    if (robotOrientation == 'N')
                        if (robotYCoordinate + 1 > maxUpperCoord) {
                            var scentFound = false;
                            scent.forEach(s =>{
                                if (s.xpos == robotXCoordinate && s.ypos == robotYCoordinate)
                                    scentFound = true;
                            });
                            lost = !scentFound;
                        }
                        else
                            robotYCoordinate = robotYCoordinate + 1;
                    else if (robotOrientation == 'E')
                        if (robotXCoordinate + 1 > maxRightCoord) {
                            var scentFound = false;
                            scent.forEach(s =>{
                                if (s.xpos == robotXCoordinate && s.ypos == robotYCoordinate)
                                    scentFound = true;
                            });
                            lost = !scentFound;
                        }
                        else
                            robotXCoordinate = robotXCoordinate + 1;
                    else if (robotOrientation == 'S')
                        if (robotYCoordinate - 1 < 0) {
                            var scentFound = false;
                            scent.forEach(s =>{
                                if (s.xpos == robotXCoordinate && s.ypos == robotYCoordinate)
                                    scentFound = true;
                            });
                            lost = !scentFound;
                        }
                        else
                            robotYCoordinate = robotYCoordinate - 1;
                    else if (robotOrientation == 'W')
                        if (robotXCoordinate - 1 < 0) {
                            var scentFound = false;
                            scent.forEach(s =>{
                                if (s.xpos == robotXCoordinate && s.ypos == robotYCoordinate)
                                    scentFound = true;
                            });
                            lost = !scentFound;
                        }
                        else
                            robotXCoordinate = robotXCoordinate - 1;
                }
                else {
                    console.log('Incorrect instruction, the valid ones are "R", "L" or "F"');
                    process.exit();
                }

                if (lost)
                    scent.push({ xpos: robotXCoordinate, ypos: robotYCoordinate });
            }

        });
    }


    function writeResult() {
        var writeFile = fs.createWriteStream(output_file);
        writeFile.on('error', function (err) {
            if (err)
                throw err;
        });
        robots.forEach(function (v) { writeFile.write(v.join(' ') + '\n'); });
        writeFile.end();
    }

});
