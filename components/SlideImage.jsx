import { useEffect, useState } from 'react';

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '//picsum.photos/1920/1080',
    '//picsum.photos/700/800',
    '//picsum.photos/500/600',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="z-10 text-center block w-full">
      <h2 className="text-2xl font-bold mb-4"></h2>
      <div className="relative md:w-[300px] w-full max-w-md mx-auto h-[350px] rounded-3xl overflow-hidden">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
