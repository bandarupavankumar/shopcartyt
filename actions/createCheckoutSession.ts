"use server";

import { Address } from "@/sanity.types";
import { CartItem } from "@/store";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Simulate successful order creation
    console.log('Order created:', {
      orderNumber: metadata.orderNumber,
      customerEmail: metadata.customerEmail,
      items: items.map(item => ({
        product: item.product?.name,
        quantity: item.quantity,
        price: item.product?.price
      }))
    });

    // Return success URL
    return `${process.env.NEXT_PUBLIC_BASE_URL || ''}/order-success?orderNumber=${metadata.orderNumber}`;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}
