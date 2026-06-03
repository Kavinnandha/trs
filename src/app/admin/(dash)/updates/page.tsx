import Link from "next/link";
import { Plus, Pencil, Newspaper, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAllUpdatesAdmin } from "@/db/queries";
import { formatDate } from "@/lib/format";
import { deleteUpdateAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUpdatesPage() {
  const updates = await getAllUpdatesAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Updates</h1>
          <p className="text-muted-foreground">{updates.length} posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/updates/new"><Plus className="mr-1.5 h-4 w-4" /> New Post</Link>
        </Button>
      </div>

      {updates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Newspaper className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="font-serif text-xl font-semibold text-foreground">No posts yet</h3>
          <p className="mb-5 mt-1 text-muted-foreground">Write your first market update or announcement.</p>
          <Button asChild>
            <Link href="/admin/updates/new"><Plus className="mr-1.5 h-4 w-4" /> New Post</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-4 font-semibold">Post</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {updates.map((u) => (
                  <tr key={u.id} className="hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                          {u.coverImage && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={u.coverImage} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <p className="line-clamp-1 font-medium text-foreground">{u.title}</p>
                      </div>
                    </td>
                    <td className="p-4 capitalize text-muted-foreground">{u.category}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          u.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {u.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{formatDate(u.publishedAt ?? u.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {u.published && (
                          <Link
                            href={`/updates/${u.slug}`}
                            target="_blank"
                            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            aria-label="View"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/updates/${u.id}`}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteButton action={deleteUpdateAction} id={u.id} message={`Delete "${u.title}"?`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
