import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ManageRolesPage() {
  return (
    <div>
       <Card>
        <CardHeader>
          <CardTitle>User Role Management</CardTitle>
          <CardDescription>
            Here you can view all registered users and change their roles (user, developer, admin).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>The functionality to list users and modify their roles will be implemented here.</p>
          <p className="mt-4 text-sm text-muted-foreground">This will involve fetching users from Firebase and using a server action to update their custom claims.</p>
        </CardContent>
      </Card>
    </div>
  );
}
