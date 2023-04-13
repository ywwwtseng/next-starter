export class ClientError extends Error {
  code: number;
  info: any;

  public constructor(message = 'Unknown error', code: number, info: any) {
    super(message);

    this.code = code;
    this.info = info;
  }
}