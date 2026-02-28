import express from 'express';
import { getSources } from './mega';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', proxy: process.env.PROXY_URL || 'default' });
});

app.get('/get', async (req, res) => {
  try {
    let embedUrl = req.query.url as string;
    if (!embedUrl || embedUrl === "") {
      res.status(400).json({ 'Error': 'No URL provided.' });
      return;
    } else {
      try {
        new URL(decodeURI(embedUrl));
      } catch (e) {
        res.status(400).json({ 'Error': 'Invalid URL provided.' });
        return;
      }
    }
    embedUrl = decodeURI(embedUrl);
    let xrax = embedUrl.split("/").pop()!.split("?").shift()!;
    const result = await getSources(xrax);
    if (!result || !result.sources) {
      res.status(500).json({ Error: 'Failed to extract sources', details: result });
      return;
    }
    res.json(result);
  } catch (error: any) {
    console.error('Error in /get:', error);
    res.status(500).json({ Error: 'Internal server error', message: error.message || String(error) });
  }
});

app.get('/:xrax', async (req, res) => {
  try {
    const { xrax } = req.params;
    if (!xrax || xrax === ""){
      res.status(400).json({ Error: 'Invalid API request' });
      return;
    }
    const result = await getSources(xrax);
    if (!result || !result.sources) {
      res.status(500).json({ Error: 'Failed to extract sources', details: result });
      return;
    }
    res.json(result);
  } catch (error: any) {
    console.error('Error in /:xrax:', error);
    res.status(500).json({ Error: 'Internal server error', message: error.message || String(error) });
  }
});

app.use((req, res) => {
  res.status(404).json({ Error: 'Invalid API request' });
});

const port = parseInt(process.env.PORT!) || 4000;
app.listen(port, () => {
  console.log(`Mega is running on port ${port}`);
  console.log(`Using proxy: ${process.env.PROXY_URL || 'https://nameless-rain-3f4c.bca24-mehulsaini.workers.dev'}`);
});
