import Razorpay from "razorpay";
import randomstring from "randomstring";

export var instance = new Razorpay({
    key_id: process.env.RP_KEY || '',
    key_secret: process.env.RP_SECRET || '',
});

export const createdOrder = async (req: any, res: any) => {
    const amount = Number(req.body.amount) * 100

    if (!amount) {
        return res.send({ message: "Invalid params" })
    }
    try {
        var options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: `order_rcptid_${randomstring.generate(10)}`
        };
        const order = await instance.orders.create(options);
        return res.send({
            ...order,
            keyId: "rzp_test_IgvCIccUWuQ6ID",
            callbackUrl: "http://localhost:3000/callback"
        });
    } catch (error) {
        return res.send({ message: "Error" })
    }
}

export const paymentCallback = async (req: any, res: any) => {
    console.log(req);
}