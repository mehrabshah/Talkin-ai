export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.replicate.com/v1/predictions/" + req.query.id,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      // Optional: You can log the error for debugging purposes
      const error = await response.json();
      res.status(500).json({ message: "Something went wrong. Please try again later." });
      return;
    }

    const prediction = await response.json();
    res.status(200).json(prediction);

  } catch (error) {
    console.error("Error fetching the prediction:", error);
    res.status(500).json({ message: "We encountered an issue processing your request. Please try again later." });
  }
}
