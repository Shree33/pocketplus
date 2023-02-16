//Get list of articles from pocket
export default async function handler(req,res) {
    const { access_token }  = req.query;
    try {
        const response = await fetch(`https://getpocket.com/v3/get?consumer_key=${process.env.POCKET_CONSUMER_KEY}&access_token=${process.env.ACCESS_TOKEN}&detailType=complete&count=50`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        const json = await response.json();
        return res.status(200).json({ data: json.list });
    } catch (error) {
        return res
        .status(500)
        .json({ message: error.message, type: "Internal server error" });
    }

}