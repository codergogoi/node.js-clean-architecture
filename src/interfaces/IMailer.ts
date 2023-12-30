export interface IMailer {
  SendEmail(to: string, product: unknown);
}
