import express from "express";

export const testSocketRouter = express.Router();

testSocketRouter.get("/", (req, res) => {
  return res.render("test-socket", {});
  //   return res.status(200).json({
  //     status: "success",
  //     msg: "listado de pets",
  //     data: pets,
  //   });
});
