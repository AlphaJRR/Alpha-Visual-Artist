import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import PortalLayout from "./PortalLayout";
import { apiFetch, type PortalProject } from "@/lib/api";

const STATUS_LABEL: Record<PortalProject["status"], string> = {
  draft: "Draft",
  in_review: "In Review",
  approved: "Approved",
  delivered: "Delivered",
};

const STATUS_COLOR: Record<PortalProject["status"], string> = {
  draft: "bg-white/10 text-white/80",
  in_review: "bg-yellow-400/20 text-yellow-300",
  approved: "bg-emerald-400/20 text-emerald-300",
  delivered: "bg-primary/20 text-primary",
};

export default function PortalIndex() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["portal", "projects"],
    queryFn: () => apiFetch<{ projects: PortalProject[] }>("/portal/projects"),
  });

  return (
    <PortalLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          Your projects
        </h1>
        <p className="text-white/60 mt-2">
          Review final cuts, leave feedback, and approve deliverables.
        </p>
      </div>

      {isLoading && <p className="text-white/60">Loading projects…</p>}
      {error && (
        <p className="text-red-400">Couldn't load projects: {(error as Error).message}</p>
      )}

      {data && data.projects.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-white/70">
            No projects yet. We'll post your deliverables here as soon as they're ready.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.projects.map((p) => (
          <Link
            key={p.id}
            href={`/portal/projects/${p.id}`}
            className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all p-5 block"
          >
            {p.coverImagePath && (
              <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-black">
                <img
                  src={`/api/storage${p.coverImagePath}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${STATUS_COLOR[p.status]}`}
              >
                {STATUS_LABEL[p.status]}
              </span>
            </div>
            {p.description && (
              <p className="text-white/60 text-sm mt-2 line-clamp-2">{p.description}</p>
            )}
          </Link>
        ))}
      </div>
    </PortalLayout>
  );
}
