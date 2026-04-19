// src/models/Video.ts
import mongoose, { Schema, Document, Model } from "mongoose";
 
export interface IVideo extends Document {
  title:     string;
  category:  string;
  duration:  string;
  level:     string;
  videoUrl:  string;
  fileId:    string;   // ImageKit fileId — needed for deletion
  desc:      string;
  createdAt: Date;
  updatedAt: Date;
}
 
const VideoSchema = new Schema<IVideo>(
  {
    title:    { type: String, required: true, trim: true },
    category: {
      type:     String,
      required: true,
      enum: [
        "Pronunciation",
        "Spoken English",
        "Grammar",
        "IELTS / PTE / TOEFL",
        "Business English",
        "Personality Development",
      ],
    },
    duration: { type: String, required: true, trim: true },  // e.g. "9:22"
    level: {
      type:     String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
    },
    videoUrl: { type: String, required: true, trim: true },  // ImageKit CDN URL
    fileId:   { type: String, required: true, trim: true },  // ImageKit fileId
    desc:     { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
 
const Video: Model<IVideo> =
  mongoose.models.Video ?? mongoose.model<IVideo>("Video", VideoSchema);
 
export default Video;