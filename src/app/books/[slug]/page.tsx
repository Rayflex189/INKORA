import React from "react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { PublicReaderView } from "@/components/books/PublicReaderView";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const book = await db.bookGalleryItem.findFirst({
    where: {
      OR: [{ slug: params.slug }, { id: params.slug }],
      visibility: "PUBLIC",
    },
  });

  if (!book) {
    return {
      title: "Book Not Found — INKORA",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://inkora.app";
  const canonicalUrl = `${appUrl}/books/${book.slug || book.id}`;

  return {
    title: `${book.title} by ${book.author} — Read on INKORA`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      url: canonicalUrl,
      siteName: "INKORA",
      images: book.coverImage ? [{ url: book.coverImage }] : [],
      type: "book",
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.description,
      images: book.coverImage ? [book.coverImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PublicBookPage({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();

  const book = await db.bookGalleryItem.findFirst({
    where: {
      OR: [{ slug: params.slug }, { id: params.slug }],
      visibility: "PUBLIC",
    },
  });

  if (!book) {
    notFound();
  }

  // Fetch chapters strictly without exposing private notes/drafts/research
  const chapters = await db.chapter.findMany({
    where: { projectId: book.projectId },
    orderBy: { orderIndex: "asc" },
    select: {
      id: true,
      title: true,
      orderIndex: true,
      content: true,
    },
  });

  // Increment view counter asynchronously
  await db.bookGalleryItem.update({
    where: { id: book.id },
    data: { viewsCount: { increment: 1 } },
  }).catch(() => {});

  return (
    <PublicReaderView
      book={book}
      chapters={chapters}
      currentUser={currentUser}
    />
  );
}
