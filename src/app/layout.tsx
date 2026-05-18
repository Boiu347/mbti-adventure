import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "灵魂冒险 · MBTI 人格测试",
  description: "一段奇幻冒险，12 个命运抉择，揭晓你的真实人格。沉浸式故事体验，发现你的灵魂角色。",
  keywords: ["MBTI", "人格测试", "性格测试", "奇幻冒险", "心理测试"],
  openGraph: {
    title: "灵魂冒险 · MBTI 人格测试",
    description: "一段奇幻冒险，12 个命运抉择，揭晓你的真实人格",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
