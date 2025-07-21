import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webhook Test Page',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function WebhookTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}