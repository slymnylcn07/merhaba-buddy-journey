import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const videoReviews = [
  { id: 1, src: "/videos/customer-review-1.mp4", title: "Verified Customer" },
  { id: 2, src: "/videos/customer-review-2.mp4", title: "Verified Customer" },
  { id: 3, src: "/videos/customer-review-3.mp4", title: "Verified Customer" },
  { id: 4, src: "/videos/customer-review-4.mp4", title: "Verified Customer" },
  { id: 5, src: "/videos/customer-review-5.mp4", title: "Verified Customer" },
];

export const VideoReviews = () => {
  return (
    <section className="py-12 mb-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4">REAL RESULTS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Customer <span className="text-primary">Video Reviews</span>
          </h2>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {videoReviews.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

const VideoCard = ({ video }: { video: typeof videoReviews[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="inline-block">
      <div 
        className="relative w-[280px] h-[500px] rounded-xl overflow-hidden bg-muted cursor-pointer group"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onLoadedMetadata={(e) => {
            const videoElement = e.currentTarget;
            videoElement.play().catch(() => {
              // Auto-play blocked, user will need to click
            });
            setIsPlaying(true);
          }}
        />
        
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-foreground border-b-8 border-b-transparent ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <p className="text-center mt-3 text-sm font-medium text-muted-foreground">
        {video.title}
      </p>
    </div>
  );
};
