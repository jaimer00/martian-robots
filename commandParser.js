const fs = require('fs');

const args = process.argv.slice(2);
if (args.length != 2) {
    console.log('Invocation format is: node app.js "input_name" "output_name"');
    process.exit();
}

var input_file = './' + (args[0]) + '.txt';
exports.input_file = input_file;

var output_file = './' + (args[1]) + '.txt';
exports.output_file = output_file;

if (!fs.existsSync(input_file)) {
    console.log('Could not find input file');
    process.exit();
}

if (fs.existsSync(output_file)) {
    console.log('A file with the same name as output file already exists, try with another name or delete the existing one');
    process.exit();
}
