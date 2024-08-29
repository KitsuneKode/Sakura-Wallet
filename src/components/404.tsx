import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [isJapanese, setIsJapanese] = useState(true);
  const navigate = useNavigate();
  const toggleLanguage = () => setIsJapanese(!isJapanese);

  return (
    <div className="min-h-screen bg-[#FFF5F5] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-[#FF6B6B] mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-[#1A202C] mb-4">
        {isJapanese ? "ページが見つかりません" : "Page Not Found, Bruh"}
      </h2>
      <p className="text-xl text-[#4A5568] mb-8">
        {isJapanese
          ? "お探しのページは存在しないようです。"
          : "Looks like you're in the wrong place AND the wrong page. Double whammy!"}
      </p>

      <div className="w-76 h-76 mb-8">
        <img
          src="https://github.com/user-attachments/assets/a9634270-60e5-45a4-911f-898b9dbffbad"
          alt="Crying Pikachu"
          className="w-full h-full object-contain rounded-lg shadow-lg"
        />
      </div>
      <p className="text-lg text-[#4A5568] mb-8 italic">
        {isJapanese
          ? '"ピカ...ピカ..." (Pika...Pika...) Even Pikachu couldn\'t find this page!'
          : '"Pika...Pika..." (That\'s "Page not found" in Pokémon, for those who don\'t speak electric mouse.)'}
      </p>
      <div className="space-y-4">
        <Button
          onClick={toggleLanguage}
          className="bg-[#4A5568] hover:bg-[#2D3748] text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#4A5568] focus:ring-opacity-50"
        >
          {isJapanese ? "Translate to English" : "日本語に翻訳"}
        </Button>

        <Button
          asChild
          className="bg-[#FF6B6B] hover:bg-[#FF8E8E] text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-opacity-50"
        >
          <a onClick={() => navigate("/")}>
            {isJapanese
              ? "ホームに戻る(Home)"
              : "Return Home (if you can find it)"}
          </a>
        </Button>
      </div>
      {!isJapanese && (
        <p className="text-sm text-[#4A5568] mt-8 max-w-md">
          P.S. If you clicked this, you're probably on the wrong website anyway.
          Maybe try searching for "Help to learn Japanese" instead?
        </p>
      )}
    </div>
  );
}
