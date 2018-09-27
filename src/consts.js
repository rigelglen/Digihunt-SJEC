const codes = ["JT8DZdWCtfn0ZrI", "kd32fMHUGAYcLFe", "ovssUvoCP5RTAeY", "Jn2MNONSzaIsh6X", "9wK5L0tZZwEuyKe", "Eg3tt0G0QhlwmuE", "gaDkqegWLDrYd3d"];

var fs = require("fs");

const saveList = (userState) => {
  fs.writeFile("src/filename.json", JSON.stringify(userState), "utf8", () => {
    console.log("saved");
  });
}

exports.codes = codes;
exports.saveList = saveList;