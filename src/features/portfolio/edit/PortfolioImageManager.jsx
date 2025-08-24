import {useEffect, useRef, useState} from 'react';
import {X} from 'lucide-react';

export default function PortfolioImageManager({
  existingImages = [],
  pendingImages = [],
  onExistingImagesChange,
  onPendingImagesChange,
  isEditing = true,
}) {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = pendingImages.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
    };
  }, [pendingImages]);

  const handleFileUpload = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    const newPendingImages = [...pendingImages, ...incoming];
    onPendingImagesChange(newPendingImages);

    if (inputRef.current) inputRef.current.value = '';
  };

  const removeExistingImage = (imageId) => {
    const updated = existingImages.filter((img) => img.id !== imageId);

    if (updated.length > 0) {
      updated[0].isThumbnail = true;
    }

    onExistingImagesChange(updated);
  };

  const removePendingImage = (index) => {
    const updated = pendingImages.filter((_, i) => i !== index);
    onPendingImagesChange(updated);
  };

  return (
    <div>
      {/* 기존 이미지들 */}
      {existingImages.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-[12px]">
            {existingImages.map((img, index) => (
              <div key={img.id} className="relative w-[120px] h-[120px]">
                <div className="w-[120px] h-[120px] bg-gray-100 rounded-[10px] overflow-hidden border">
                  <img src={img.url} alt="기존 이미지" className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute -top-[0px] -right-[0px] w-6 h-6 text-white"
                    title="이미지 삭제"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 새로 추가할 이미지들 */}
      {pendingImages.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-[12px]">
            {pendingImages.map((file, idx) => (
              <div key={idx} className="relative w-[120px] h-[120px]">
                <div className="w-[120px] h-[120px] bg-gray-100 rounded-[10px] overflow-hidden border">
                  <img src={previews[idx]} alt={file.name} className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removePendingImage(idx)}
                    className="absolute -top-[0px] -right-[0px] w-6 h-6 text-white"
                    title="이미지 제거"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 파일 업로드 버튼 */}
      {isEditing && (
        <label className="inline-block px-[24px] py-[6px] mt-[8px] mb-[24px] bg-[#F1F0EFB2] font-[700] rounded-[8px] hover:bg-[#F1F0EF] cursor-pointer">
          파일 선택
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
