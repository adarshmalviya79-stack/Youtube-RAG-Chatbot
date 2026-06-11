import { CheckCircle, Info, ExternalLink, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface VideoPreviewCardProps {
  videoId: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  activeTimestamp: number | null; // active seek target in seconds
}

export default function VideoPreviewCard({ videoId, title, author, thumbnailUrl, activeTimestamp }: VideoPreviewCardProps) {
  // Construct the secure embedded play URL with active start state
  const iframeSrc = activeTimestamp !== null
    ? `https://www.youtube.com/embed/${videoId}?start=${activeTimestamp}&autoplay=1&rel=0`
    : `https://www.youtube.com/embed/${videoId}?rel=0`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-100/50 dark:border-slate-800/80 dark:bg-slate-900/60 dark:shadow-none transition-all duration-300">
      {/* Video player view frame */}
      <div className="relative aspect-video w-full bg-slate-900 shadow-inner">
        {videoId ? (
          <iframe
            id="youtube-player"
            title={title}
            src={iframeSrc}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 filter blur-[2px]"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        )}
      </div>

      {/* Video metadata and tags */}
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            <CheckCircle className="h-3.5 w-3.5" /> Video Indexed
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <Info className="h-3 w-3" /> ID: {videoId}
          </div>
        </div>

        <h3 className="mt-3 font-sans text-base font-bold leading-snug text-slate-800 dark:text-white line-clamp-2" title={title}>
          {title}
        </h3>

        <p className="mt-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
          Uploader: <span className="text-slate-850 dark:text-slate-250 font-bold">{author}</span>
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-slate-850">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Indexed Session: Live</span>
          </div>
          <a
            href={`https://youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
