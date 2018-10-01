const secretCodes = ["JT8DZdWCtfn0ZrI", "kd32fMHUGAYcLFe", "ovssUvoCP5RTAeY", "Jn2MNONSzaIsh6X", "9wK5L0tZZwEuyKe", "Eg3tt0G0QhlwmuE", "gaDkqegWLDrYd3d", "PaDDqajWLDrYR3d"];

var fs = require("fs");

const saveList = (userState) => {
  console.log('UserState to be saved is \n' + JSON.stringify(userState, null, 4));
  fs.writeFile("src/filename.json", JSON.stringify(userState, null, 4), "utf8", () => {
    console.log("saved");
  });
  fs.writeFile("src/filename2.json", JSON.stringify(userState, null, 4), "utf8", () => {
    console.log("saved backup");
  });
}

const codes = ['kilgarah', 123456, 1234561, 1234562, 'flfflffff', 1234563, 1234564, 1234565];

exports.codes = secretCodes;
exports.saveList = saveList;
exports.secrets = codes;