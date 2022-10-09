import { Request, Response } from "express";
import mongoose, { CallbackError, Document } from "mongoose";

import ProductModel from "../models/product.model";
import log from "../logger";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const postMessages = await ProductModel.find();
    log.info("Get all products successfully");
    res.status(200).json(postMessages);
  } catch (error: any) {
    log.error("Get all products failed");
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = req.body;

  const newProduct = new ProductModel(product);

  try {
    await newProduct.save();
    log.info("Product created successfully");
    res.status(201).json(newProduct);
  } catch (error: any) {
    log.error("Product created failed");
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const updateProduct = await ProductModel.findOneAndUpdate(
      { productId: id },
      product,
      {
        new: true,
      }
    );
    log.info(`Product updated successfully`);
    res.json(updateProduct);
  } catch (error) {
    log.error(`No product with id ${id} for updating`);
    res.status(404).send("No product with that id");
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  ProductModel.findOneAndRemove(
    { productId: id },
    function (err: CallbackError, doc: Document) {
      if (err) {
        log.error(err);
      } else {
        log.info(`Product deleted successfully`);
        res.json({ message: "Product deleted successfully" });
      }
    }
  );
};
