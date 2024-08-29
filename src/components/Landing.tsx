import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Gift,
  CreditCard,
  Sparkles,
  Clock,
  Cherry,
  Lock,
  Zap,
  Shield,
  Sun,
  Moon,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

import FeatureCard from "./FeatureCard";
import BackgroundKanji from "./BackgroundKanji";
import { useNavigate } from "react-router-dom";
export default function LandingPage(): JSX.Element {
  const [animatedKanji, setAnimatedKanji] = useState("暗号");
  const [darkMode, setDarkMode] = useState(false);
  const kanjis = ["暗号", "安全", "速い", "信頼"];
  const meanings = ["Crypto", "Safety", "Fast", "Trust"];

  const [currency, setCurrency] = useState("JPY");

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * kanjis.length);
      setAnimatedKanji(kanjis[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
        <BackgroundKanji />
        <header className=" container mx-auto px-4 py-6 flex justify-between items-center z-10 sticky top-0 bg-red-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Cherry className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold">桜ウォレット</span>
            <button className=" bg-red-200 dark:bg-red-700 text-xs font-bold mt-3 px-2 rounded-xl text-red-600 dark:text-red-200 transition-colors">
              BETA
            </button>
          </div>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-red-500 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("security")}
              className="hover:text-red-500 transition-colors"
            >
              Security
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-red-500 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="hover:text-red-500 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </nav>
        </header>

        <main className="relative z-10">
          <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Next-Gen Crypto Wallet
                <br />
                Inspired by Japanese Spirit
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Protect your digital assets with Sakura Wallet, combining
                safety, speed, and beauty.
              </p>
              <Button
                className="bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors"
                onClick={() => {
                  navigate("/setupWallet/");
                }}
              >
                Get Started Now
              </Button>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
              <div className="w-80 h-80 mx-auto bg-white dark:bg-gray-700 rounded-full shadow-2xl flex items-center justify-center">
                <motion.div
                  key={animatedKanji}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="text-9xl font-bold text-red-500"
                >
                  {animatedKanji}
                </motion.div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-96 h-96 border-4 border-red-200 dark:border-red-800 rounded-full"
                />
              </div>
            </div>
          </section>

          <section
            id="features"
            className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300 scroll-mt-24"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Wallet Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Zap className="h-12 w-12 text-red-500" />}
                  title="Swift Transactions"
                  description="Complete transactions instantly, minimizing wait times."
                  kanji="速い"
                  kanjiMeaning="Fast"
                />
                <FeatureCard
                  icon={<Lock className="h-12 w-12 text-red-500" />}
                  title="Top-tier Encryption"
                  description="Protect your assets with cutting-edge encryption technology."
                  kanji="安全"
                  kanjiMeaning="Safety"
                />
                <FeatureCard
                  icon={<Cherry className="h-12 w-12 text-red-500" />}
                  title="Japanese Aesthetics"
                  description="An interface that balances usability and beauty."
                  kanji="美"
                  kanjiMeaning="Beauty"
                />
              </div>
            </div>
          </section>

          <section
            id="security"
            className="py-20 bg-red-50 dark:bg-gray-900 transition-colors duration-300 scroll-mt-24"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Robust Security
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 space-y-4">
                  <p className="  font-600 text-xl">
                    Sakura Wallet implements state-of-the-art security measures:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <SecurityFeature text="Multi-signature support (多重署名 - Tajū shomei)" />
                    <SecurityFeature text="Two-factor authentication (二要素認証 - Niyōso ninshō)" />
                    <SecurityFeature text="Cold storage options (コールドストレージ - Kōrudo sutorēji)" />
                    <SecurityFeature text="24/7 monitoring system (24時間監視システム - 24-jikan kanshi shisutemu)" />
                  </ul>
                </div>
                <div className="md:w-1/2 mt-10 md:mt-0">
                  <Shield className="h-64 w-64 text-red-500 mx-auto" />
                </div>
              </div>
            </div>
          </section>

          <section
            id="pricing"
            className="py-20 px-4 bg-white dark:bg-gray-700 transition-colors duration-300 scroll-mt-24"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold  mb-4">
                  Blossom with Sakura Wallet
                </h2>
                <p className="text-xl ">
                  Choose the plan that suits your crypto journey
                </p>
              </div>

              <Tabs defaultValue="JPY" className="mb-8">
                <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
                  <TabsTrigger value="JPY" onClick={() => setCurrency("JPY")}>
                    JPY
                  </TabsTrigger>
                  <TabsTrigger value="USD" onClick={() => setCurrency("USD")}>
                    USD
                  </TabsTrigger>
                  <TabsTrigger value="INR" onClick={() => setCurrency("INR")}>
                    INR
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard
                  title="Sakura Seed"
                  description="Start your journey"
                  price={getPriceInCurrency(0, currency)}
                  features={[
                    "Basic wallet functions",
                    "Up to 3 cryptocurrencies",
                    "Community support",
                  ]}
                  // icon={<Cherry className="w-12 h-12 text-[#FF6B6B]" />}
                  icon={
                    <img
                      className="w-28 h-28 mx-auto"
                      rel="icon"
                      src="/WalletPngs/Choice1-removebg-preview.png"
                    />
                  }
                />
                <PricingCard
                  title="Sakura Bloom"
                  description="Unlock full potential"
                  price={getPriceInCurrency(1500, currency)}
                  features={[
                    "Unlimited cryptocurrencies",
                    "Advanced analytics",
                    "Priority support",
                    "Custom themes",
                  ]}
                  highlighted={true}
                  icon={
                    <img
                      className="w-14 h-14"
                      src="/WalletPngs/choice2-removebg-preview.png"
                    />
                  }
                />
                <SupportCard currency={currency} />
              </div>
            </div>
          </section>
          <section
            id="cta"
            className="py-20 bg-red-500 text-white scroll-mt-24"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Start Your Financial Future Today
              </h2>
              <p className="text-xl mb-8">
                Manage your cryptocurrencies safely and smartly with Sakura
                Wallet. Create an account now and unlock new possibilities.
              </p>
              <Button
                className="bg-white text-red-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => {
                  navigate("/setupWallet/");
                }}
              >
                Create Free Account
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-10 relative z-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Cherry className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">桜ウォレット</span>
              <span className="text  font-bold">by</span>
              <a
                href="https://github.com/kitsunekode"
                className="text-xl font-bold text-red-500 hover:text-red-600 transition-colors"
                target="_blank"
              >
                KitsuneKode
              </a>
            </div>
            <nav className="flex space-x-4 mb-4 md:mb-0">
              <a
                href="#Privacy"
                className="hover:text-red-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a href="#Terms" className="hover:text-red-500 transition-colors">
                Terms of Service
              </a>
              <a
                href="#Support"
                className="hover:text-red-500 transition-colors"
              >
                Contact Us
              </a>
            </nav>
            <div className="flex space-x-4">
              <a
                href="https://github.com/KitsuneKode/Sakura-Wallet"
                className="text-white hover:text-red-500 transition-colors"
                target="_blank"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/kitsunekode"
                className="text-white hover:text-red-500 transition-colors"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/KitsuneKode"
                className="text-white hover:text-red-500 transition-colors"
                target="_blank"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  icon: JSX.Element;
};

function PricingCard({
  title,
  description,
  price,
  features,
  highlighted = false,
  icon,
}: PricingCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className={`bg-white border-2 ${
        highlighted ? "border-[#FF6B6B] shadow-lg" : "border-[#E2E8F0]"
      } overflow-hidden`}
    >
      <div className={`p-4 ${highlighted ? "bg-[#FF6B6B]" : "bg-[#FFF5F5]"}`}>
        {icon}
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#1A202C]">
          {title}
        </CardTitle>
        <CardDescription className="text-[#4A5568]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-[#FF6B6B] mb-4">{price}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              <span className="text-[#4A5568]">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${
            highlighted
              ? "bg-[#FF6B6B] hover:bg-[#FF8E8E]"
              : "bg-[#4A5568] hover:bg-[#2D3748]"
          } text-white`}
          onClick={() => {
            navigate("/setupWallet/");
          }}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}

function SecurityFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center space-x-2">
      <Clock className="w-5 h-5 text-[#FF6B6B]" />
      <span className="">{text}</span>
    </li>
  );
}

function SupportCard({ currency }: { currency: string }) {
  return (
    <Card className="bg-white border-2 border-[#E2E8F0] overflow-hidden">
      <div className="p-4 bg-[#FFF5F5]">
        <Gift className="w-12 h-12 text-[#FF6B6B]" />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#1A202C]">
          Support Sakura
        </CardTitle>
        <CardDescription className="text-[#4A5568]">
          Help us grow and improve
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-[#FF6B6B]" />
          <span className="text-[#4A5568]">One-time donation</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-[#FF6B6B]" />
          <span className="text-[#4A5568]">
            Monthly support from {getPriceInCurrency(500, currency)}
          </span>
        </div>
        <div>
          <Badge className="bg-[#FF6B6B] text-white">
            Special perks for supporters!
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full bg-[#4A5568] hover:bg-[#2D3748] text-white">
          Make a Donation
        </Button>
        <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF8E8E] text-white flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.4375 6.71875C14.4375 4.88672 13.0508 3.5 11.2188 3.5C9.38672 3.5 8 4.88672 8 6.71875C8 8.55078 9.38672 9.9375 11.2188 9.9375C13.0508 9.9375 14.4375 8.55078 14.4375 6.71875ZM20.9688 14.75C20.9688 13.2305 19.7383 12 18.2188 12H4.21875C2.69922 12 1.46875 13.2305 1.46875 14.75V18.25C1.46875 19.7695 2.69922 21 4.21875 21H18.2188C19.7383 21 20.9688 19.7695 20.9688 18.25V14.75Z" />
          </svg>
          Support on Patreon
        </Button>
      </CardFooter>
    </Card>
  );
}

function getPriceInCurrency(priceInJPY: number, currency: string) {
  const exchangeRates: { [key: string]: number } = {
    JPY: 1,
    USD: 0.0067,
    INR: 0.56,
  };
  const symbols: { [key: string]: string } = {
    JPY: "¥",
    USD: "$",
    INR: "₹",
  };
  const convertedPrice = Math.round(priceInJPY * exchangeRates[currency]);
  return `${symbols[currency]}${convertedPrice}${
    currency === "JPY" ? "/月" : "/mo"
  }`;
}
