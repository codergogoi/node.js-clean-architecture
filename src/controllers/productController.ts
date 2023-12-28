import { Request, Response } from "express";
import { pgClient } from "../dbConnection";
import { NotifyToPromotionService, SendSendGridEmail } from "../helper";

const dbConn = pgClient();

export const CreateProduct = async (req: Request, res: Response) => {
  await dbConn.connect();

  const body = req.body;
  // validate logic

  const product = await dbConn.query(
    `INSERT INTO products (name,description,price,stock) VALUES ($1,$2,$3,$4) RETURNING *`,
    [body.name, body.desc, body.price, body.stock]
  );

  console.log(`Product created! ${product.rows[0]}`);
  await NotifyToPromotionService(product.rows[0]);

  return res.status(200).json({ product: product.rows[0] });
};

export const GetProducts = async (req: Request, res: Response) => {
  await dbConn.connect();

  const products = await dbConn.query(`SELECT * FROM products`);

  console.log(`Products result! ${JSON.stringify(products.rows)}`);

  return res.status(200).json(products.rows);
};

export const UpdateProductStock = async (req: Request, res: Response) => {
  await dbConn.connect();
  const id = req.params.id;
  const body = req.body;

  const product = await dbConn.query(
    `UPDATE products SET stock=$1 WHERE id=$2 RETURNING *`,
    [body.stock, id]
  );

  console.log(`Product Updated! ${JSON.stringify(product.rows[0])}`);

  await SendSendGridEmail(product.rows[0]);

  return res.status(200).json({ product: product.rows[0] });
};
