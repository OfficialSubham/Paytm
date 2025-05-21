import express from "express";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
})

app.listen(5000);
