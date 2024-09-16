import type { Database } from "@/lib/schema";  // Adjust the path according to your project structure

export type Species = Database["public"]["Tables"]["species"]["Row"];
