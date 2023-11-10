const BulletinBoard = artifacts.require("./BulletinBoard");
 
module.exports = function(deployer) {
  deployer.deploy(BulletinBoard);
};