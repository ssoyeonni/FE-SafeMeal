import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX, Play } from "lucide-react";
import { shortForm } from "../data/shortForm";

export default function ShortFormPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const shorts = shortForm

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % shorts.length);
    } else {
      setDirection(-1);
      setCurrentIndex((prev) => (prev === 0 ? shorts.length - 1 : prev - 1));
    }
    setLiked(false);
    setIsPlaying(true);
  };

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction) => ({
      y: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-[calc(100vh-72px)] bg-black overflow-hidden flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={shorts[currentIndex].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          {/* 영상 */}
          <video
            ref={videoRef}
            src={shorts[currentIndex].src}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            onClick={handlePlayPause}
          />

          {/* 일시정지 시 재생 버튼 */}
          {!isPlaying && (
            <div
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <Play size={28} color="white" />
              </div>
            </div>
          )}

          {/* 좋아요 버튼 */}
          <div className="absolute right-6 bottom-[120px] flex flex-col items-center space-y-5">
            <button
              onClick={() => setLiked(!liked)}
              className="flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  liked ? "bg-red-500" : "bg-white/30"
                }`}
              >
                <Heart
                  size={22}
                  color="white"
                  fill={liked ? "white" : "none"}
                />
              </div>
              <span className="text-white text-sm mt-1">
                {(
                  shorts[currentIndex].likes + (liked ? 1 : 0)
                ).toLocaleString()}
              </span>
            </button>

            {/* 음소거 토글 */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-white/30 p-2 rounded-full"
            >
              {isMuted ? (
                <VolumeX size={22} color="white" />
              ) : (
                <Volume2 size={22} color="white" />
              )}
            </button>
          </div>

          {/* 제목 & 작성자 */}
          <div className="absolute bottom-[60px] left-0 w-full px-6">
            <p className="text-white text-[16px] font-semibold leading-tight">
              {shorts[currentIndex].title}
            </p>
            <p className="text-gray-300 text-[14px] mt-1">
              {shorts[currentIndex].author}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}