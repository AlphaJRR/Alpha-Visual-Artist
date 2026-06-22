import { useState } from "react";
import { Link, useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpload } from "@workspace/object-storage-web";

type UploadSuccessResponse = {
  objectPath: string;
  metadata: {
    name: string;
    contentType: string;
    size: number;
  };
};
import PortalLayout, { usePortalUser } from "./PortalLayout";
import {
  apiFetch,
  type PortalProject,
  type PortalVideo,
  type PortalComment,
  type PortalUpload,
} from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function PortalProjectPage() {
  const [, params] = useRoute("/portal/projects/:id");
  const id = params?.id;
  const me = usePortalUser();
  const project = useQuery({
    queryKey: ["portal", "project", id],
    queryFn: () =>
      apiFetch<{ project: PortalProject; videos: PortalVideo[] }>(
        `/portal/projects/${id}`,
      ),
    enabled: !!id,
  });

  if (!id) return null;

  return (
    <PortalLayout>
      <Link href="/portal" className="text-sm text-white/50 hover:text-white">
        ← All projects
      </Link>

      {project.isLoading && <p className="text-white/60 mt-6">Loading…</p>}
      {project.error && (
        <p className="text-red-400 mt-6">{(project.error as Error).message}</p>
      )}
      {project.data && (
        <ProjectBody
          project={project.data.project}
          videos={project.data.videos}
          isAdmin={me.data?.role === "admin"}
        />
      )}
    </PortalLayout>
  );
}

function ProjectBody({
  project,
  videos,
  isAdmin,
}: {
  project: PortalProject;
  videos: PortalVideo[];
  isAdmin: boolean;
}) {
  const queryClient = useQueryClient();

  const approveMut = useMutation({
    mutationFn: () =>
      apiFetch(`/portal/projects/${project.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: "approved" }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal", "project", project.id] });
      queryClient.invalidateQueries({ queryKey: ["portal", "projects"] });
    },
  });

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-white/60 mt-2 max-w-2xl">{project.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 text-white/80">
            {project.status.replace("_", " ")}
          </span>
          {project.status !== "approved" && project.status !== "delivered" && (
            <Button
              onClick={() => approveMut.mutate()}
              disabled={approveMut.isPending}
              className="rounded-full bg-primary text-black hover:bg-primary/90"
            >
              {approveMut.isPending ? "Approving…" : "Approve project"}
            </Button>
          )}
        </div>
      </div>

      <section className="space-y-10">
        {videos.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/60">
            No videos posted yet.
          </div>
        )}
        {videos.map((v) => (
          <VideoBlock key={v.id} video={v} />
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold mb-4">Reference uploads</h2>
        <UploadsBlock projectId={project.id} />
      </section>

      {isAdmin && <AdminVideoUploader projectId={project.id} />}
    </div>
  );
}

function VideoBlock({ video }: { video: PortalVideo }) {
  const queryClient = useQueryClient();
  const [body, setBody] = useState("");
  const me = usePortalUser();

  const comments = useQuery({
    queryKey: ["portal", "video", video.id, "comments"],
    queryFn: () =>
      apiFetch<{ comments: PortalComment[] }>(
        `/portal/videos/${video.id}/comments`,
      ),
  });

  const addComment = useMutation({
    mutationFn: (payload: { body: string; isApproval?: boolean }) =>
      apiFetch(`/portal/videos/${video.id}/comments`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      setBody("");
      queryClient.invalidateQueries({
        queryKey: ["portal", "video", video.id, "comments"],
      });
    },
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="aspect-video bg-black">
        <video
          src={`/api/storage${video.objectPath}`}
          controls
          className="w-full h-full"
          poster={video.thumbnailPath ? `/api/storage${video.thumbnailPath}` : undefined}
        />
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg">{video.title}</h3>

        <div className="mt-5 space-y-3">
          {comments.isLoading && <p className="text-white/50 text-sm">Loading…</p>}
          {comments.data?.comments.length === 0 && (
            <p className="text-white/50 text-sm">No comments yet.</p>
          )}
          {comments.data?.comments.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-white/5 bg-black/20 p-3 text-sm"
            >
              <div className="flex items-center gap-2 text-xs text-white/50 mb-1">
                <span className="font-medium text-white/80">
                  {c.userName || c.userEmail}
                </span>
                {c.userRole === "admin" && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                    Alpha
                  </span>
                )}
                {c.isApproval && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300">
                    Approved
                  </span>
                )}
                <span className="ml-auto">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-white/90 whitespace-pre-wrap">{c.body}</p>
            </div>
          ))}
        </div>

        <form
          className="mt-4 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (body.trim()) addComment.mutate({ body: body.trim() });
          }}
        >
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Leave feedback…"
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm focus:outline-none focus:border-primary"
          />
          <div className="flex gap-2 justify-end">
            {me.data?.role === "client" && (
              <Button
                type="button"
                variant="outline"
                disabled={addComment.isPending || !body.trim()}
                onClick={() =>
                  body.trim() &&
                  addComment.mutate({ body: body.trim(), isApproval: true })
                }
              >
                Approve with note
              </Button>
            )}
            <Button
              type="submit"
              disabled={addComment.isPending || !body.trim()}
              className="rounded-full bg-primary text-black hover:bg-primary/90"
            >
              Post comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UploadsBlock({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const uploads = useQuery({
    queryKey: ["portal", "project", projectId, "uploads"],
    queryFn: () =>
      apiFetch<{ uploads: PortalUpload[] }>(
        `/portal/projects/${projectId}/uploads`,
      ),
  });

  const register = useMutation({
    mutationFn: (payload: {
      objectPath: string;
      name: string;
      contentType?: string;
      size?: number;
    }) =>
      apiFetch(`/portal/projects/${projectId}/uploads`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["portal", "project", projectId, "uploads"],
      });
    },
  });

  const upload = useUpload({
    onSuccess: (resp: UploadSuccessResponse) => {
      register.mutate({
        objectPath: resp.objectPath,
        name: resp.metadata.name,
        contentType: resp.metadata.contentType,
        size: resp.metadata.size,
      });
    },
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm text-white/70">
          Share reference files (logos, scripts, brand kits) with the team.
        </p>
        <label className="cursor-pointer rounded-full bg-primary text-black hover:bg-primary/90 px-4 py-2 text-sm font-semibold">
          {upload.isUploading ? `Uploading… ${upload.progress}%` : "Upload file"}
          <input
            type="file"
            className="hidden"
            disabled={upload.isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload.uploadFile(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {upload.error && (
        <p className="text-red-400 text-sm mb-3">{upload.error.message}</p>
      )}
      {uploads.data?.uploads.length === 0 && (
        <p className="text-white/50 text-sm">No reference files yet.</p>
      )}
      <ul className="divide-y divide-white/5">
        {uploads.data?.uploads.map((u) => (
          <li
            key={u.id}
            className="py-3 flex items-center justify-between gap-3 text-sm"
          >
            <div className="min-w-0">
              <a
                href={`/api/storage${u.objectPath}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline truncate block"
              >
                {u.name}
              </a>
              <p className="text-white/40 text-xs">
                {u.userName || u.userEmail} · {new Date(u.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminVideoUploader({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [pendingType, setPendingType] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: (payload: {
      title: string;
      objectPath: string;
      contentType?: string;
    }) =>
      apiFetch(`/portal/projects/${projectId}/videos`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      setTitle("");
      setPendingPath(null);
      setPendingType(null);
      queryClient.invalidateQueries({ queryKey: ["portal", "project", projectId] });
    },
  });

  const upload = useUpload({
    onSuccess: (resp: UploadSuccessResponse) => {
      setPendingPath(resp.objectPath);
      setPendingType(resp.metadata.contentType);
    },
  });

  return (
    <section className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-5">
      <h2 className="font-display text-xl font-semibold mb-4 text-primary">
        Admin: Add a video
      </h2>
      <div className="grid sm:grid-cols-[1fr_auto] gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
          className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm focus:outline-none focus:border-primary"
        />
        <label className="cursor-pointer rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium flex items-center justify-center">
          {upload.isUploading
            ? `Uploading… ${upload.progress}%`
            : pendingPath
              ? "Replace file"
              : "Upload video file"}
          <input
            type="file"
            accept="video/*"
            className="hidden"
            disabled={upload.isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload.uploadFile(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {pendingPath && (
        <p className="text-xs text-white/50 mt-2 truncate">Ready: {pendingPath}</p>
      )}
      {upload.error && (
        <p className="text-red-400 text-sm mt-2">{upload.error.message}</p>
      )}
      <div className="mt-4">
        <Button
          disabled={!title.trim() || !pendingPath || create.isPending}
          onClick={() =>
            pendingPath &&
            create.mutate({
              title: title.trim(),
              objectPath: pendingPath,
              contentType: pendingType ?? undefined,
            })
          }
          className="rounded-full bg-primary text-black hover:bg-primary/90"
        >
          {create.isPending ? "Saving…" : "Add video to project"}
        </Button>
      </div>
    </section>
  );
}
