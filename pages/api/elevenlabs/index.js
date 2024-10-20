export default async function handler(req, res) {
    if (req.method === "POST") {
      const { message, voice } = req.body;
  
      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
          {
            method: "POST",
            headers: {
              accept: "audio/mpeg",
              "Content-Type": "application/json",
              "xi-api-key": process.env.ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text: message,
              voice_settings: {
                stability: 0,
                similarity_boost: 0,
              },
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const arrayBuffer = await response.arrayBuffer();
  
        res.status(200).send(Buffer.from(arrayBuffer));
      } catch (error) {
        console.error({ Error: error });
        res.status(500).send("Failed to fetch api: generate");
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  