"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import EditSpeciesDialog from "./edit-species-dialog";
import type { Species } from "./types";  // Import the shared Species type

export default function SpeciesCard({ species, isOwner }: { species: Species; isOwner: boolean }) {
  const [open, setOpen] = useState<boolean>(false); // State to manage dialog visibility

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-3 w-full">Learn More</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Scientific Name: {species.scientific_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {species.image && (
              <div className="relative w-full h-full">
                <Image src={species.image} alt={species.scientific_name} fill className="object-contain" />
              </div>
            )}
            <p><strong>Common Name:</strong> {species.common_name ?? "N/A"}</p>
            <p><strong>Total Population:</strong> {species.total_population ?? "Unknown"}</p>
            <p><strong>Kingdom:</strong> {species.kingdom}</p>
            <p><strong>Description:</strong> {species.description ?? "No description available."}</p>
          </div>
        </DialogContent>
      </Dialog>

      {isOwner && (
        <EditSpeciesDialog species={species} />  // Only show Edit button if user is the owner
      )}
    </div>
  );
}
