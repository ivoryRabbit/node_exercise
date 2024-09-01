import express from "express";
import axios from "axios";

const app = express();
const port = process.env.port || 3001;

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/getDirections", async (req, res) => {
    const { start, goal, option } = req.query;
    
    console.log(`Query parameters: ${start}, ${goal}, ${option}`)

    const url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving"
    const headers = {
        "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_API_KEY_ID,
        "X-NCP-APIGW-API-KEY": process.env.NAVER_API_KEY,
    }

    try {
        const response = await axios.get(url, {
            params: { start, goal, option },
            headers: headers,
        })

        res.status(200).json(response.data)
    } catch (error) {
        console.error(`Error: ${error.message}`)

        if (error.response) {
            console.error(`Error response: ${error.response.data}`);
        }
        res.status(error.response ? error.response.status : 500).json({
            error: error.message,
            details: error.response ? error.message.data: null,
        })
    }
})

const server = app.listen(port, () => {
    console.log(`server ready on port ${port}.`);
});

module.exports = app;
