export default function FeatureCard({
  icon,
  title,
  description,
  kanji,
  kanjiMeaning,
}: Props) {
  return (
    <div className="bg-red-50 dark:bg-gray-700 p-6 rounded-lg text-center transition-colors duration-300">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="text-3xl font-bold text-red-500 mb-1">{kanji}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {kanjiMeaning}
      </div>
    </div>
  );
}

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  kanji: string;
  kanjiMeaning: string;
}
