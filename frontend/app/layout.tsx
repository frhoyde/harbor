import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import {
  CircleCheckIcon,
  HomeIcon,
  LineChartIcon,
  PinIcon,
} from "lucide-react";
import Link from "next/link";
import NavLink from "@/components/shared/NavLink";
import TopNav from "@/components/shared/TopNav";
import Auth from "@/components/shared/Auth";
import { getServerSession } from "next-auth";

import Provider from "@/lib/provider";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harbor ",
  description: "A app made for storage unit management",
};

const navigation = [
  { name: "Dashboard", href: "/", icon: <HomeIcon /> },
  { name: "Explore", href: "/explore", icon: <PinIcon /> },
  { name: "Proposals", href: "/proposals", icon: <CircleCheckIcon /> },
  { name: "Insights", href: "/insights", icon: <LineChartIcon /> },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <div className="flex min-h-screen w-full   relative">
            <div className="grow-[15%] pt-8 pb-8 h-screen sticky top-0 left-0 self-start">
              <div className="border-r px-4 h-full ">
                <div className="mb-10 mx-auto h-[26px]">
                  <Image
                    src="/logo.png"
                    alt="Harbor"
                    width={200}
                    height={200}
                    className="w-32 h-auto"
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <nav>
                    <ul className="flex flex-col">
                      {navigation.map((nav) => (
                        <li key={nav.href}>
                          <NavLink {...nav} />
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div>
                    <Auth />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative flex flex-col ">
              <div className="sticky top-0 left-0 self-start pt-8 pb-8 px-3 w-full bg-background z-50 ">
                <TopNav navigation={navigation} />
              </div>
              <div className="px-3">{children}</div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
