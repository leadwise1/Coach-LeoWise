import { useRouter } from 'next/router';

export const Hero = () => {
  const router = useRouter();

  const handleGenerateResume = () => {
    router.push('/resume');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
      >
        {/* Make sure this path is correct! If your video is in `public/hero-video.mp4`, the src should be "/hero-video.mp4" */}
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Coach-LeoWise</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">Create an AI-powered, ATS-optimized resume in minutes.</p>
        <button onClick={handleGenerateResume} className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          Generate My Resume
        </button>
      </div>
    </div>
  );
};