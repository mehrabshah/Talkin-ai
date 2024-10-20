export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "c2bf488da9f4d6b546400f6877b68424e7cc9053b762087af372d6acdfe99a83",
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
    console.error("Error during prediction request:", error);
    res.status(500).json({ message: "We encountered an issue processing your request. Please try again later." });
  }
}
