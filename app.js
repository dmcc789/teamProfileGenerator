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
        console.log("Your team profile has been generated!")
    };
});

function teamPrompts() {
    inquirer.prompt([{
        type: "list",
        message: "Select team member's role",
        choices: [
            "Manager",
            "Engineer",
            "Employee",
            "Intern",
        ],
        name: "role",
    }]).then function(data) {
        let newMember = data.choices;

        if (newMember == "Manager") {
            newManager();
        }
        else if (newMember == "Engineer") {
            newEngineer();
        }
        else if (newMember == "Intern") {
            newIntern();
        }
    }
}

function newManager() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the Manager's name",
        name: "name",
    },
    {
        type: "input",
        message: "Enter the Manager's office number",
        name: "office",
    },
    {
        type: "input",
        message: "Enter the Manager's email address",
        name: "email"
    },
]).then((response) => {
    const manager = new Manager(
        response.name,
        response.office,
        response.email,
      );
      team.push(manager);
      addMem();
})
};
function newEngineer() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the Engineer's name",
        name: "name",
    },
    {
        type: "input",
        message: "Enter the Engineer's github username",
        name: "github",
    },
    {
        type: "input",
        message: "Enter the Engineer's email address",
        name: "email"
    },
]).then((response) => {
    const engineer = new Engineer(
        response.name,
        response.github,
        response.email,
      );
      team.push(engineer);
      addMem();
})
};





function buildTeam() {
    
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}








// function startHtml() {
//     const html = `
//     <!doctype html>
//     <html lang="en">
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
//         <title>Team Profile</title>
//     </head>

//     <body>
//         <div class="col-md-12 jumbotron jumbotron-fluid">
//             <div class="container">
//              <h1 class="display-4 text-center">Team Profile</h1>
//             </div>
//         </div>
//         <div class="container">
//             <div class="row"> 
//     `;
//     fs.writeFile("./output/team.html", html, function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     console.log("start");
// }

// function addHtml(member) {
//     return new Promise(function(resolve, reject) {
//         const name = member.getName();
//         const role = member.getRole();
//         const id = member.getId();
//         const email = member.getEmail();
//         let data = "";
//         if (role === "Engineer") {
//             const gitHub = member.getGithub();
//             data = `<div class="col-6">
//             <div class="card mx-auto mb-3" style="width: 18rem">
//             <h5 class="card-header">${name}<br /><br />Engineer</h5>
//             <ul class="list-group list-group-flush">
//                 <li class="list-group-item">ID: ${id}</li>
//                 <li class="list-group-item">Email Address: ${email}</li>
//                 <li class="list-group-item">GitHub: ${gitHub}</li>
//             </ul>
//             </div>
//         </div>`;
//         } else if (role === "Intern") {
//             const school = member.getSchool();
//             data = `<div class="col-6">
//             <div class="card mx-auto mb-3" style="width: 18rem">
//             <h5 class="card-header">${name}<br /><br />Intern</h5>
//             <ul class="list-group list-group-flush">
//                 <li class="list-group-item">ID: ${id}</li>
//                 <li class="list-group-item">Email Address: ${email}</li>
//                 <li class="list-group-item">School: ${school}</li>
//             </ul>
//             </div>
//         </div>`;
//         } else {
//             const officePhone = member.getOfficeNumber();
//             data = `<div class="col-6">
//             <div class="card mx-auto mb-3" style="width: 18rem">
//             <h5 class="card-header">${name}<br /><br />Manager</h5>
//             <ul class="list-group list-group-flush">
//                 <li class="list-group-item">ID: ${id}</li>
//                 <li class="list-group-item">Email Address: ${email}</li>
//                 <li class="list-group-item">Office Phone: ${officePhone}</li>
//             </ul>
//             </div>
//         </div>`
//         }
//         console.log("adding team member");
//         fs.appendFile("./output/team.html", data, function (err) {
//             if (err) {
//                 return reject(err);
//             };
//             return resolve();
//         });
//     });
    
            
    
        
    
    
// }

// function endHtml() {
//     const html = ` 
//     </div>
//     </div>
//     </body>
//     `;

//     fs.appendFile("./output/team.html", html, function (err) {
//         if (err) {
//             console.log(err);
//         };
//     });
//     console.log("end");
// }


// createProfile();










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
