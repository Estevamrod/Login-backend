import * as jose from 'jose';

export default class Token {
    secret:Uint8Array | jose.KeyLike;
    refreshSecret: Uint8Array | jose.KeyLike;
    constructor() {
        this.secret = new TextEncoder().encode(process.env.JWTSECRET);
        this.refreshSecret = new TextEncoder().encode(process.env.REFRESHSECRET);
    }
    async login (userData:jose.JWTPayload):Promise<string> {
        const tsig = await new jose.SignJWT(userData)
        .setProtectedHeader({alg:"HS256", typ:"jwt"})
        .setExpirationTime('15m')
        .setIssuedAt()
        .sign(this.secret)
        return tsig;
    }
    async verification (jwt:string | Uint8Array):Promise<jose.JWTVerifyResult> {
        return await jose.jwtVerify(jwt, this.secret);
    }
    decoded (token:string):jose.JWTPayload {
        return jose.decodeJwt(token);
    }
}