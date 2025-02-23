import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TOKEN } from '../server.js';


export async function exportData(req, res, Model) {
  try {
    const { token } = req.body;
    if (token != TOKEN)
      return res.status(401).json({ code: 71, message: "Access Denied!" });

    const data = await Model.findAll();
    const fileName = `${Model.name}_${Date.now()}.json`;
    const filePath = join(dirname(fileURLToPath(import.meta.url)), fileName);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.download(filePath, fileName, (error) => {
      if (error)
        res.status(500).json({ code: 72, message: "Download Failed!" });
    });
  } catch (error) {
    res.status(400).json({ code: 70, message: error.message });
  }
}

export async function importData(req, res, Model) {
  try {
    const { token, fileName } = req.body;
    if (token != TOKEN)
      return res.status(401).json({ code: 81, message: "Access Denied!" });

    const filePath = join(dirname(fileURLToPath(import.meta.url)), fileName);

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const item of data)
      await Model.upsert(item);

    res.status(201).json({ code: 89, message: "Import Succeeded." });
  } catch (error) {
    res.status(400).json({ code: 80, message: error.message });
  }
}