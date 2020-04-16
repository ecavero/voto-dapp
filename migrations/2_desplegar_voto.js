
const Voto = artifacts.require("Voto");

module.exports = function(deployer) {
  deployer.deploy(Voto);
};
