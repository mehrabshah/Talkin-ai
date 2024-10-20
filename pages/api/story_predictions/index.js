export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "ebaf838f0327faa50fc7179e237385e9e4225933a4b20a8de5f6c5dfd061c1cd",
        input: req.body,
      }),
    });

    if (response.status !== 201) {
      const error = await response.json();
      res.status(500).json({ message: "Something went wrong. Please try again later." });
      return;
    }

    if (response.status === 401) {
      res.status(401).json({ message: "You are not authorized. Please log in and try again." });
      return;
    }

    const prediction = await response.json();
    res.status(201).json(prediction);

  } catch (error) {
    console.error("Error processing the prediction:", error);
    res.status(500).json({ message: "We encountered an issue processing your request. Please try again later." });
  }
}
