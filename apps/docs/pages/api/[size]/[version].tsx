import { NextApiRequest, NextApiResponse } from "next";

export default function JSONGetter(
  req: NextApiRequest,
  res: NextApiResponse<string | { message: string }>
) {
  const { query } = req;
  const { size, version } = query;

  console.time('API Fetch Time');
  let file = null;
  try {
    file = require(`../../../diffs/${size}/${version}.json`);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: `file not found at location` });
  }
  console.timeEnd('API Fetch Time');
  console.log(`Fetched file ${size}/${version}.json`)
  console.log();

  // User with id exists
  return file
    ? res.status(200).json(JSON.stringify(file, null, 2))
    : res.status(404).json({ message: `file not found` });
}
