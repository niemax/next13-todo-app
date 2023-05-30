import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("SESSION:", session);

  return <main>Hello from todo app!</main>;
}
