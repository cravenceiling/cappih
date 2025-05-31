import Navbar from "@/components/navbar";
import { DashboardContainer } from "./dashboard-container";
import { getDashboardSummary } from "./actions";

export default async function Page() {
  const initialDashboardSummary = await getDashboardSummary();
  const transactions = initialDashboardSummary.recentTransactions;

  return (
    <div>
      <Navbar />
      <main className="flex-1 mx-auto bg-background">
        <DashboardContainer
          initialTransactions={transactions}
          dashboardSummary={initialDashboardSummary}
        />
      </main>
    </div>
  );
}
