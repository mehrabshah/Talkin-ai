export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "2442eef54c3952f70025ed22b825e4ca188ea640f8207792a5f260d5e6ffdc0b",
        input: req.body,
      }),
    });

    if (response.status === 401) {
      res.status(401).json({ message: "You are not authorized. Please log in and try again." });
      return;
    }

    if (response.status !== 201) {
      const error = await response.json();
      res.status(500).json({ message: "Something went wrong. Please try again later." });
      return;


    }

    const prediction = await response.json();
    res.status(201).json(prediction);
  } catch (error) {
    console.error("Error during API call:", error);
    res.status(500).json({ message: "We encountered an issue processing your request. Please try again later." });
  }
}
