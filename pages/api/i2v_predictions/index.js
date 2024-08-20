export default async function handler(req, res) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/talkin-ai/bot/versions
      //version: "aadac43580241cae38535a3e28c203e51e00f8c59ed6f5fbf23e7731db160a40",
      version: "23a63ec05d0a8bf905d08bbc1a17d09f6c9d21a971e5322612ad22aafaa692cf",
      // This is the text prompt that will be submitted by a form on the frontend
      input: req.body,
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
