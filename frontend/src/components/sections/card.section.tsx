import { Users, BarChart3, ShieldCheck } from "lucide-react";
import Card from "../card";
export default function CardSection() {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-3 gap-6 px-6 pb-10 max-w-7xl mx-auto">
        <Card
          title="Smart Njangi Tracking"
          description="Effortlessly manage group contributions, payment rotations, and member records with real-time updates and complete transparency."
          icon={<Users size={20} />}
        />
        <Card
          title="Community Finance Insights"
          description="Get detailed insights on group savings, payouts, and trends to empower smarter financial decisions within your Njangi groups."
          icon={<BarChart3 size={20} />}
        />
        <Card
          title="Secure & Scalable Platform"
          description="Built with enterprise-grade security and flexibility to support multiple Njangi groups, members, and growing community needs."
          icon={<ShieldCheck size={20} />}
        />
      </div>
    </section>
  );
}
