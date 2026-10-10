import MessageComp from "@/components/Message";
import Users from "@/components/Users";

export default function Home() {
  return (
    <div className="h-screen">
      <MessageComp/>
      <Users />
    </div>
  );
}
