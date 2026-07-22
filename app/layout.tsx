import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "ILPS no Campo — conhecimento que cria raízes",
    description: "Agente educacional offline-first sobre ILPS para produtores da Amazônia.",
    openGraph: {
      title: "ILPS no Campo",
      description: "Conhecimento que cria raízes — educação sobre ILPS para produtores da Amazônia.",
      images: [{ url: `${origin}/og.png`, width: 1732, height: 909, alt: "ILPS no Campo — conhecimento que cria raízes" }],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ILPS no Campo",
      description: "Conhecimento que cria raízes.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
