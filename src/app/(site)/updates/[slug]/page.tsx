import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { KolamDivider } from "@/components/motifs/Motifs";
import { getPublishedUpdateBySlug } from "@/db/queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const update = await getPublishedUpdateBySlug(slug);
  if (!update) return { title: "Update not found" };
  return { title: update.title, description: update.excerpt };
}

export default async function UpdateDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const update = await getPublishedUpdateBySlug(slug);
  if (!update) notFound();

  return (
    <article className="min-h-screen bg-background pb-24 pt-24">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <Link
          href="/updates"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Updates
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold capitalize text-accent-foreground">
            {update.category}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {formatDate(update.publishedAt)}
          </span>
        </div>

        <h1 className="mb-6 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
          {update.title}
        </h1>

        {update.coverImage && (
          <div className="relative mb-10 h-64 overflow-hidden rounded-2xl md:h-96">
            <Image src={update.coverImage} alt={update.title} fill priority className="object-cover" />
          </div>
        )}

        <div className="text-lg text-foreground/85">
          {update.excerpt && (
            <p className="mb-6 border-l-4 border-accent pl-4 font-serif text-xl italic text-foreground">
              {update.excerpt}
            </p>
          )}
          <Markdown content={update.body} />
        </div>

        <KolamDivider className="mt-14" />
      </div>
    </article>
  );
}
