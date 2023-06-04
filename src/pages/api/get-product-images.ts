import type { NextApiRequest, NextApiResponse } from "next";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { removeFileExtension } from "@/shared/utils";
import { storage } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { fileId } = req.query;
  const folderRef = ref(storage, `${prefix}Products/${fileId}`);
  const { items } = await listAll(folderRef);
  const results = await Promise.all(
    items.map(async (item) => {
      const url = await getDownloadURL(item);
      return {
        url,
        sort: Number(removeFileExtension(item.name)),
      };
    })
  );
  res.status(200).json({ results });
}
