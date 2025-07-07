import { h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import { Ref } from 'preact';

interface VideoPlayerProps {
  onVideoEvent: (eventType: string, currentTime?: number) => void;
  onVideoLoad: (url: string) => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ onVideoEvent, onVideoLoad }, ref) => {
    useEffect(() => {
      const video = ref as Ref<HTMLVideoElement>;
      if (!video.current) return;

      const handleLoadedMetadata = () => {
        if (video.current?.src) {
          onVideoLoad(video.current.src);
        }
      };

      const handlePlay = () => {
        onVideoEvent('play', video.current?.currentTime);
      };

      const handlePause = () => {
        onVideoEvent('pause', video.current?.currentTime);
      };

      const handleSeeked = () => {
        onVideoEvent('seek', video.current?.currentTime);
      };

      const videoElement = video.current;
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('seeked', handleSeeked);

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('seeked', handleSeeked);
      };
    }, [onVideoEvent, onVideoLoad, ref]);

    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-black rounded-xl overflow-hidden">
          <video
            ref={ref}
            controls
            className="w-full h-96 bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }
);

export default VideoPlayer;