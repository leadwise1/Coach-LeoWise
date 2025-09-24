type Props = { src: string };

export default function VideoCoach({ src }: Props) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border bg-black/5 shadow-xl sm:h-[460px]">
      <div className="pointer-events-none absolute -inset-10-z-10 rounded-[36px] bg-gradient-to-b from-violet-200/50 via-fuchsia-100/30 to-transparent blur-3xl" />
      <video
        className="absolute inset-0 h-full w-full object-contain"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}