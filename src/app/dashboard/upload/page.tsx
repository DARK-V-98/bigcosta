import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function UploadProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Upload New Project</h1>
       <Card>
        <CardHeader>
          <CardTitle>Project Image Upload</CardTitle>
          <CardDescription>
            Upload images for new projects to be displayed on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p>A form to upload an image and add project details (title, category) will be implemented here.</p>
           <p className="mt-4 text-sm text-muted-foreground">This will use Firebase Storage for the images and Firestore to save the project metadata.</p>
        </CardContent>
      </Card>
    </div>
  );
}
