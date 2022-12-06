import * as jwt from 'jsonwebtoken';

export default class JwtToken {
  static createToken(data:number): string {
    return jwt.sign(
      { data },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d', algorithm: 'HS256' },
    );
  }

  // static validateToken(token:string):void {
  //   try {
  //     const { data } = jwt.verify(token, process.env.JWT_SECRET as string);
  //     return data;
  //   } catch (error) {
  //     const e = new Error('erro');
  //     e.name = 'erro';
  //     return e;
  //   }
  // }
}
