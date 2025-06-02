import express from "express";
import { prisma } from "@repo/db/client"
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Working perfectly"})
})

app.post("/hdfcWebhook", async (req, res) => {
    try {
        //TOKEN part is remaining
        const paymentInformation = {
            token: req.body.token,
            userId: req.body.user_identifier,
            amount: req.body.amount
        }
        console.log(paymentInformation)
        // const check = await prisma.balance.update({
        //         where: {
        //             userId: paymentInformation.userId
        //         },
        //         data: {
        //             amount: {
        //                 increment: paymentInformation.amount
        //             }
        //         }
        //     })
        const response = await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        console.log(response)

        res.status(200).json({
            message: "Captured"
        })
    } catch (error) {
        res.status(200).json({
            message: "Captured",
            error
        })
    }
})

app.listen(3003, () => {
    console.log("App Is listening")
});
