export class RequestError extends Error {
  status: number;
  info: any;

  public constructor(message = 'Unknown error', status: number, info: any) {
    super(message);

    this.status = status;
    this.info = info;
  }
}