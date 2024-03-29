import bcrypt from 'bcrypt';

export default class Crypt {
    saltRound:string| number;
    constructor(saltRound:string | number) {
        this.saltRound = saltRound;
    }
    hash (object_data:any):string {
        return bcrypt.hashSync(object_data, this.saltRound);
    }
    compare (password:string | Buffer, hash:string):boolean {
        return bcrypt.compareSync(password, hash);
    }
}