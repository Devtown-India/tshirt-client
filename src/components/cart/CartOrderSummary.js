import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import axios from '../../axiosInstance'
import { formatPrice } from './PriceTag'


const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
        <Flex justify="space-between" fontSize="sm">
            <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
                {label}
            </Text>
            {value ? <Text fontWeight="medium">{value}</Text> : children}
        </Flex>
    )
}

export const CartOrderSummary = ({ total }) => {


    const loadScript = React.useCallback((src) => {
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
    }, [])

    const handleOrder = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("/order/createOrder", {
            amount: total*100
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_j6l92FGAKfP5bv", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "+Plus.",
            description: "Test Transaction",
            image: 'https://www.svgrepo.com/show/174895/orkut-logo.svg',
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("/order/verify", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Kartik Gupta",
                email: "kartikdps.kg@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Model Town, New Delhi",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    return (
        <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
            <Heading size="md">Order Summary</Heading>

            <Stack spacing="6">
                $<OrderSummaryItem label="Subtotal" value={total} />
                <OrderSummaryItem label="Shipping + Tax">
                    <Link href="#" textDecor="underline">
                        + Free shipping
                    </Link>
                </OrderSummaryItem>
                {/* <OrderSummaryItem label="Coupon Code">
                    <Link href="#" textDecor="underline">
                        Add coupon code
                    </Link>
                </OrderSummaryItem> */}
                <Flex justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">
                        Total
                    </Text>
                    <Text fontSize="xl" fontWeight="extrabold">
                        &#x20B9;{total}
                    </Text>
                </Flex>
            </Stack>
            <Button onClick={handleOrder} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                Checkout
            </Button>
        </Stack>
    )
}
