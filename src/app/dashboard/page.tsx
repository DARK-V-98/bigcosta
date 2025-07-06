import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>
            This is your control center. You can manage user roles and upload new project images from the sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>More dashboard widgets and analytics will be available here in the future.</p>
        </CardContent>
      </Card>
    </div>
  );
}
