const localStorage = require(localStorage);

const USER = JSON.parse(localStorage.getItem('my-account'));
const NET = USER.networkEndpoint;
const WALLETADDRESS = USER.account;

module.exports = {
    NET,
    WALLETADDRESS,
}