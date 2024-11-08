import { Button } from "@/components/ui/button"; // Adjust based on your shadcn setup
import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  description: string;
}
export default function ErrorPageWrapper({title, subtitle, description}: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center h-full p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">{title}</h1>
      <h2 className="text-3xl font-semibold mb-2">{subtitle}</h2>
      <p className="text-lg mb-8 text-center">
        {description}
      </p>
      <Link href="/home" passHref>
        <Button className="px-6 py-2 rounded-lg text-white">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
