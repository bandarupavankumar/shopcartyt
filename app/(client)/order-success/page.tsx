// app/(client)/order-success/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Order Successful',
  description: 'Thank you for your order!',
};

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { orderNumber?: string };
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        {searchParams.orderNumber && (
          <p className="text-gray-600 mb-6">
            Your order number is: <span className="font-semibold">{searchParams.orderNumber}</span>
          </p>
        )}
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We've sent you an email with your order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}