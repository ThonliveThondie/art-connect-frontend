export default function ({title, category, image}) {
  return (
    <div className="bg-white cursor-pointer w-[290px] h-[270px]">
      <div className="overflow-hidden w-full h-[157px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="py-[20px]">
        <h3 className="font-[600] text-[20px] mb-[10px]">{title}</h3>
        <p className="text-black/20 text-[16px]">{category}</p>
      </div>
    </div>
  );
}
