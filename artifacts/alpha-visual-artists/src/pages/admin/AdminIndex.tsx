import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PortalLayout, { usePortalUser } from "../portal/PortalLayout";
import {
  apiFetch,
  type PortalProject,
  type PortalClient,
} from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AdminIndex() {
  const me = usePortalUser();

  return (
    <PortalLayout>
      {me.data && me.data.role !== "admin" ? (
        <p className="text-red-400">Admins only.</p>
      ) : (
        <AdminBody />
      )}
    </PortalLayout>
  );
}

function AdminBody() {
  const queryClient = useQueryClient();
  const projects = useQuery({
    queryKey: ["portal", "projects"],
    queryFn: () => apiFetch<{ projects: PortalProject[] }>("/portal/projects"),
  });
  const clients = useQuery({
    queryKey: ["portal", "clients"],
    queryFn: () => apiFetch<{ clients: PortalClient[] }>("/portal/clients"),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientUserId, setClientUserId] = useState("");

  const create = useMutation({
    mutationFn: (payload: {
      title: string;
      description?: string;
      clientUserId: string;
    }) =>
      apiFetch<{ project: PortalProject }>("/portal/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setClientUserId("");
      queryClient.invalidateQueries({ queryKey: ["portal", "projects"] });
    },
  });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Admin</h1>
        <p className="text-white/60 mt-2">
          Create projects and assign them to clients. Clients see them in their portal.
        </p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl font-semibold mb-4">New project</h2>
        <form
          className="grid sm:grid-cols-2 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (title.trim() && clientUserId) {
              create.mutate({
                title: title.trim(),
                description: description.trim() || undefined,
                clientUserId,
              });
            }
          }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm focus:outline-none focus:border-primary"
          />
          <select
            value={clientUserId}
            onChange={(e) => setClientUserId(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Select a client…</option>
            {clients.data?.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name ? `${c.name} — ${c.email}` : c.email}
              </option>
            ))}
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm focus:outline-none focus:border-primary sm:col-span-2"
          />
          <div className="sm:col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={create.isPending || !title.trim() || !clientUserId}
              className="rounded-full bg-primary text-black hover:bg-primary/90"
            >
              {create.isPending ? "Creating…" : "Create project"}
            </Button>
          </div>
        </form>
        {clients.data?.clients.length === 0 && (
          <p className="text-white/50 text-sm mt-3">
            No clients yet. Once someone signs up at /sign-up, they'll appear here.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold mb-4">All projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.data?.projects.map((p) => (
            <Link
              key={p.id}
              href={`/portal/projects/${p.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-5 block"
            >
              <h3 className="font-display font-semibold">{p.title}</h3>
              <p className="text-xs text-white/50 mt-1">
                {p.status.replace("_", " ")}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
