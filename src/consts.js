const secretCodes = ["JT8DZdWCtfn0ZrI", "kd32fMHUGAYcLFe", "ovssUvoCP5RTAeY", "Jn2MNONSzaIsh6X", "9wK5L0tZZwEuyKe", "Eg3tt0G0QhlwmuE", "gaDkqegWLDrYd3d", "PaDDqajWLDrYR3d"];

var fs = require("fs");

const saveList = (userState, io) => {
  const userStr = JSON.stringify(userState, null, 4)
  console.log('UserState to be saved is \n' + userStr);

  fs.writeFile("src/filename.json", userStr, "utf8", () => {
    console.log("saved");
  });
  fs.writeFile("src/filename2.json", userStr, "utf8", () => {
    console.log("saved backup");
  });
  io.sockets.emit('userUpdate', JSON.stringify(userState));
}

const codes = ['kilgarah', 1621, 'basilisk', 'fddFfg46@rfdfd', 'knock-knock', 'total-recall', 35];

exports.codes = secretCodes;
exports.saveList = saveList;
exports.secrets = codes;