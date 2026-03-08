import type { Request, Response } from "express";
import { googleAuth } from "../services/auth.services.js";

export const googleAuthController = async (req: Request, res: Response) => {
  try {
    const { token }: { token: string } = req.body;
    if (!token) return res.status(400).json({ error: "Token required" });

    const result = await googleAuth(token);
    console.log(result);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: err || "Authentication failed" });
  }
};
