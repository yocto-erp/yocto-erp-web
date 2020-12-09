var Client = require("ssh2").Client;

var conn = new Client();

function execute(command) {
  return new Promise((resolve, reject) => {
    let returnData = "";
    conn.exec(command, function(err, stream) {
      if (err) reject(err);
      stream.on("close", function(code, signal) {
        resolve(returnData);
      }).on("data", function(data) {
        returnData = data.toString();
      }).stderr.on("data", function(data) {
        returnData = data;
      });
    });
  });

}

conn.on("ready", async function() {
  console.log("Client :: ready");
  console.log(await execute("cd /usr/project/yocto-erp/yocto-erp-web/ && npm run build:clean"));

  conn.end();
}).connect({
  host: "104.248.156.227",
  port: 22,
  username: "root",
  privateKey: require("fs").readFileSync("/Users/lephuoccanh/.ssh/id_rsa")
});
