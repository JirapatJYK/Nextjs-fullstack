
// interface AccountModel{
//     name: String
// }
export class AccountBase {
    name: String

    constructor(name: String) {
        this.name = name
    }
}
export default class AccountWallet implements AccountBase{
    walletAddress: String
    name: String
    constructor(walletAddress: String, name: String) {
        this.walletAddress = walletAddress
        this.name = name
    }
}