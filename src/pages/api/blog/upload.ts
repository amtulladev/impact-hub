import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const uploadDir = "./public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const form = new IncomingForm({ uploadDir });

    form.parse(req, async (err: Error, fields: any, files: any) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
        return;
      }

      const oldPath = files.file[0].filepath;
      const newPath = `${uploadDir}/${files.file[0].originalFilename}`;

      fs.renameSync(oldPath, newPath);

      const fileUrl = `/uploads/${files.file[0].originalFilename}`;
      return res.status(200).json({ success: true, url: fileUrl });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
