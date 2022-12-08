interface IToken {
  token: string;
}

export interface IResultService {
  status: number,
  message: string | IToken,
}
