import { NextApiRequest, NextApiResponse } from "next";

// Allowlist the diff fixtures that can be served. Validating against these
// known values prevents the query params from being used to traverse the
// filesystem (e.g. `../../../package.json`) via the dynamic require below.
const SIZES: string[] = ["small", "large"];
const VERSIONS: string[] = ["old", "new"];

export default function JSONGetter(
  req: NextApiRequest,
  res: NextApiResponse<string | { message: string }>
) {
  const { query } = req;
  const { size, version } = query;

  if (
    typeof size !== "string" ||
    typeof version !== "string" ||
    !SIZES.includes(size) ||
    !VERSIONS.includes(version)
  ) {
    return res.status(404).json({ message: `file not found at location` });
  }

  let file = null;
  try {
    file = require(`../../../diffs/${size}/${version}.json`);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: `file not found at location` });
  }

  return file
    ? res.status(200).json(JSON.stringify(file, null, 2))
    : res.status(404).json({ message: `file not found` });
}
