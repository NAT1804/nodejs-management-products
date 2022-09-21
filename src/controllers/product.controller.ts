import { Request, Response } from "express";
import mongoose from "mongoose";

import ProductModel from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const postMessages = await ProductModel.find();

    res.status(200).json(postMessages);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = req.body;

  const newProduct = new ProductModel(product);

  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No product with that id");

  const updateProduct = await ProductModel.findByIdAndUpdate(_id, product, {
    new: true,
  });

  res.json(updateProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No product with that id");

  await ProductModel.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully" });
};
