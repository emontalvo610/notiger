import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Project from "../../../models/Project";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ data: project });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case "PUT":
      try {
        const project = await Project.findByIdAndUpdate(
          id,
          {
            name: req.body.name,
            description: req.body.description,
          },
          { new: true }
        );
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ data: project });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case "DELETE":
      try {
        const project = await Project.deleteOne({ _id: id });
        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ data: project });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
