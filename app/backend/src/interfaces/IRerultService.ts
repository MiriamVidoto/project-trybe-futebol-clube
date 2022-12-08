interface IMessage {
  message: string;
}

interface IToken {
  token: string;
}

interface IRole {
  role: string;
}

export interface IResultService {
  status: number,
  message: IMessage | IToken | IRole,
}
