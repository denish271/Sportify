import axios from "axios";
import { useCart } from "../Context/CartContext";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(grand_total) {
    
    console.log("grand_totalgrand_totalgrand_total", (Math.floor(grand_total)*100).toString());
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const data = {
        name:"denish",
        amount:grand_total
    }

    const result = await axios.post("http://localhost:8000/api/order/create",data);
    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id } = result.data;

    const options = {
        key: "rzp_test_jGcnPbCDRzOuCP", // Enter the Key ID generated from the Dashboard
        // amount: (500*100).toString(),
        amount: (Math.floor(grand_total)*100).toString(),
        // amount: "500",
        currency: "INR",
        name: "Sportify",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            // const result = await axios.post("http://localhost:8000/api/order/success", data);

            // alert(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#154360",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

export default displayRazorpay