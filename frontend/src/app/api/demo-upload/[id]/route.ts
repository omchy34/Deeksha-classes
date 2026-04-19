// src/app/api/videos/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import Video from "@/model/Video";

function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

async function deleteFromImageKit(fileId: string) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
  const credentials = Buffer.from(`${privateKey}:`).toString("base64");

  const res = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
    method:  "DELETE",
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    throw new Error(`ImageKit delete failed (${res.status}): ${err}`);
  }
}

// Next.js 15: params is now a Promise — must be awaited
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;  // ← await here
    await connectToDatabase();

    const video = await Video.findById(id);
    if (!video) return apiError("Video not found", 404);

    try {
      await deleteFromImageKit(video.fileId);
    } catch (ikErr: any) {
      console.warn("[DELETE /api/videos] ImageKit removal failed:", ikErr.message);
    }

    await video.deleteOne();

    return NextResponse.json({ success: true, message: "Video deleted" });

  } catch (err: any) {
    console.error("[DELETE /api/videos/:id]", err);
    return apiError(err.message || "Internal server error", 500);
  }
}