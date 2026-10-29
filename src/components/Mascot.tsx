import Image from 'next/image';

export type MascotPose = 'hello' | 'happy' | 'cheer' | 'thanks' | 'think' | 'enough' | 'save' | 'surprised' | 'sleepy';

// Nong Tang poses share one 240×264 viewBox (see the KaTang design system).
export default function Mascot({ pose, width, alt = '', className = '', preload = false }: {
  pose: MascotPose;
  width: number;
  alt?: string;
  className?: string;
  preload?: boolean;
}) {
  return <Image src={`/brand/nong-tang-${pose}.svg`} alt={alt} width={width} height={Math.round(width * 264 / 240)}
    preload={preload} className={`select-none ${className}`} draggable={false} />;
}
