const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://ec2-xx-xx-xx-xx.compute-1.amazonaws.com' // Replace with your EC2 URL
];

app.use(cors({
    origin: allowedOrigins
}));

app.get('/status', (req, res) => {

    res.json({ status: "ok", timestamp: new Date().toLocaleString('sv-SE') });
})


app.listen(PORT, () => {
    console.log(`server running on port no: ${PORT}`);
})
