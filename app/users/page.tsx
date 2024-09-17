import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  // Create Supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();


  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Fetch all user profiles
  const { data: profiles, error } = await supabase.from("profiles").select("email, display_name, biography").order("id", { ascending: true });

  // Handle any potential errors
  if (error) {
    return <p>Error loading user profiles</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles?.map((profile) => (
          <div key={profile.email} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{profile.display_name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="mt-2">{profile.biography ?? "No bio."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
