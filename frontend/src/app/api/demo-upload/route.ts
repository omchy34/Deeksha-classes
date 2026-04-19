// app/api/demo-upload/route.ts
// src/app/api/videos/route.ts
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import {connectToDatabase} from "@/lib/db";
import Video from "@/model/Video";

// ── ImageKit server client ────────────────────────────────────────────────────
const imagekit = new ImageKit({
  publicKey:  process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

console.log(imagekit);


// ── GET /api/videos ───────────────────────────────────────────────────────────
export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: videos });
  } catch (err: any) {
    console.error("[GET /api/videos]", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// ── POST /api/videos ──────────────────────────────────────────────────────────
// Expects multipart/form-data with:
//   file      — the video File object
//   title     — string
//   category  — string
//   duration  — string  (e.g. "9:22", auto-calculated on client)
//   level     — string
//   desc      — string
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const file     = formData.get("file")     as File   | null;
    const title    = formData.get("title")    as string | null;
    const category = formData.get("category") as string | null;
    const duration = formData.get("duration") as string | null;
    const level    = formData.get("level")    as string | null;
    const desc     = formData.get("desc")     as string | null;

    // ── Validate required fields ────────────────────────────────────────────
    if (!file || !title || !category || !duration || !level || !desc) {
      return NextResponse.json(
        { success: false, error: "All fields including a video file are required" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { success: false, error: "Uploaded file must be a video" },
        { status: 400 }
      );
    }

    // ── Convert File → Buffer for ImageKit ─────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    // ── Upload to ImageKit ──────────────────────────────────────────────────
    const uploadResponse = await imagekit.upload({
      file:              buffer,
      fileName:          file.name,
      folder:            "/videos",               // organise under /videos in ImageKit
      useUniqueFileName: true,
    });

    // ── Save to MongoDB ─────────────────────────────────────────────────────
    const video = await Video.create({
      title:    title.trim(),
      category: category.trim(),
      duration: duration.trim(),
      level:    level.trim(),
      desc:     desc.trim(),
      videoUrl: uploadResponse.url,
      fileId:   uploadResponse.fileId,
    });

    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/videos]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}