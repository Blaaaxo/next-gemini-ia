import Image from "next/image";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Chat />
    </main>
  );
}
