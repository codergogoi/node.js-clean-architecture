import { inject, injectable } from "inversify";
import { IMailer } from "../interfaces/IMailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  private mailer: IMailer;
  private broker: IMessageBroker;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository,
    @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,
    @inject(INTERFACE_TYPE.MessageBroker) broker: IMessageBroker
  ) {
    this.repository = repository;
    (this.mailer = mailer), (this.broker = broker);
  }

  async createProduct(input: any) {
    const data = await this.repository.create(input);
    // do some checks
    await this.broker.NotifyToPromotionService(data);

    return data;
  }
  async updateStock(id: number, stock: number) {
    const data = await this.repository.update(id, stock);
    await this.mailer.SendEmail("someone@someone.com", data);
    return data;
  }
  async getProducts(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
}
