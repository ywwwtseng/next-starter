export class RequestError extends Error {
  status: number;
  info: any;

  public constructor(message = 'Unknown error', status: number, info: any) {
    super(message);

    this.status = status;
    this.info = info;
  }
}

export class ClientError extends Error {
  code: number;
  info: any;

  public constructor(message = 'Unknown error', code: number, info: any) {
    super(message);

    this.code = code;
    this.info = info;
  }
}