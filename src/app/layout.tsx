// Locale pages own their HTML root so lang is correct before hydration.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
