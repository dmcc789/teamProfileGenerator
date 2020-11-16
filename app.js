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
        message: "Would you like to add a new team member?",
        name: "addNewMember", 
    }]).then(function(data){
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

addMember();