import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/")}>
      Click me
    </button>
  );
}
