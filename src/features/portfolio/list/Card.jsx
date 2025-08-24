import {useState, useEffect} from 'react';

const PLACEHOLDER = 'https://via.placeholder.com/300x300/E5E5E5/999999?text=No+Image';

export default function Card({title, category, image}) {
  const [src, setSrc] = useState(image || PLACEHOLDER);

  useEffect(() => {
    setSrc(image || PLACEHOLDER);
  }, [image]);

  return (
    <div className="bg-white cursor-pointer w-[290px] h-[270px]">
      <div className="overflow-hidden w-full h-[157px] bg-gray-100">
        <img src={src} alt={title} className="w-full h-full object-cover" onError={() => setSrc(PLACEHOLDER)} />
      </div>
      <div className="py-[20px]">
        <h3 className="font-[600] text-[20px] mb-[10px]">{title}</h3>
        <p className="text-black/20 text-[16px]">{category}</p>
      </div>
    </div>
  );
}
