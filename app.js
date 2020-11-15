const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];


function addMember() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to add a new team member?"
        default: "y", 
        name: "addNewMember", 
    }])
}.then(function(data){
    if (data.addNewMember == "y") {
        teamPrompts();
    }
    else {
        build();
        console.log("Thank you for using this app. Your team profile has been generated.")
    };
});

function teamPrompts() {
    inquirer.prompt([{
        type: "list",
        message: "Select team member's role",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        name: "role",
    }]).then((response) => {
        switch (response.role) {
            case "Manager":
                newManager();
                break;
            case "Engineer":
                newEngineer();
                break;
            case "Intern":
                newIntern();
                break;
        }
    })
};

function newManager() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the Manager's name",
        name: "name",
    },
    {
        type: "input",
        message: "Enter the Manager's ID",
        name: "id",
    },
    {
        type: "input",
        message: "Enter the Manager's email address",
        name: "email"
    },
    {
        type: "input",
        message: "Enter the Manager's office number",
        name: "office",
    },
]).then((response) => {
    const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.office,
    );
    team.push(manager);
    addMember();
})};

function newEngineer() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the Engineer's name",
        name: "name",
    },
    {
        type: "input",
        message: "Enter the Engineer's ID",
        name: "id",
    },
    {
        type: "input",
        message: "Enter the Engineer's email address",
        name: "email"
    },
    {
        type: "input",
        message: "Enter the Engineer's github username",
        name: "github",
    },
]).then((response) => {
    const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github,
    );
    team.push(engineer);
    addMember();
})};

function newIntern() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the Intern's name",
        name: "name",
    },
    {
        type: "input",
        message: "Enter the Intern's ID",
        name: "id",
    },
    {
        type: "input",
        message: "Enter the Intern's email address",
        name: "email"
    },
    {
        type: "input",
        message: "Enter the Intern's school",
        name: "school",
    },
]).then((response) => {
    const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school,
    );
    team.push(intern);
    addMember();
})};

function build() {
    
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
};





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
