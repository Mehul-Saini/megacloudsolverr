import express from 'express';
import { getSources } from './mega';

const app = express();
app.use(express.json());

app.get('/get', async (req, res) => {
  try {
    let embedUrl = req.query.url as string;
    if (!embedUrl || embedUrl === "") {
      res.status(404).json({ 'Error': 'No URL provided.' });
      return;
    } else {
      try {
        new URL(decodeURI(embedUrl));
      } catch (e) {
        res.status(404).json({ 'Error': 'Invalid URL provided.' });
        return;
      }
    }
    embedUrl = decodeURI(embedUrl);
    let xrax = embedUrl.split("/").pop().split("?").shift();
    const result = await getSources(xrax);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal server error' });
  }
});

app.get('/:xrax', async (req, res) => {
  try {
    const { xrax } = req.params;
    if (!xrax || xrax === ""){
      res.status(404).json({ Error: 'Invalid API request' });
      return
    }
    const result = await getSources(xrax);
    //console.log("result from index: ", result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Internal server error' });
  }
});

// Handle /get without xrax parameter
// app.get('/get', (req, res) => {
//   res.status(400).json({ error: 'Missing xrax parameter' });
// });

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({ Error: 'Invalid API request' });
});

const port = parseInt(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Mega is running on port ${port}`);
});