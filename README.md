# Running the app

To run the app, you must type the following command:

node app.js "input_name" "output_name"

"input_name" must contain the name of the txt file where the input has been written. It must be written without the .txt extension inside the string

"output_name" will be the name which the file with the result will have. Also must be written without the .txt extension inside the string.

# Project Content

The project is intended to create aprogram that calculates the final position of the robots.

The command that is introduced in the console will be parsed and analyzed by the function in the commandParser.js file.

Then app.js performs the reading of the input file, the application of the different operations and writes the output in the file.
