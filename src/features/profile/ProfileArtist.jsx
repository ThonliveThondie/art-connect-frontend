import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileicon from "../../membership/profile_business/icon/ProfileIcon.png";
import changeicon from "../../membership/profile_business/default/Change.png";
import changeiconhover from "../../membership/profile_business/hover/ChangeHover.png";
import outicon from "../../membership/profile_business/default/Out.png";
import outiconhover from "../../membership/profile_business/hover/OutHover.png";

const UserProfile = () => {
  const navigate = useNavigate();
  const [editingFields, setEditingFields] = useState({
    nickname: false,
    phone: false,
    email: false,
    education: false,
    major: false,
    specialty: false,
    designStyle: false,
  });
  const [formData, setFormData] = useState({
    nickname: "마지막선물",
    phone: "010-1234-5678",
    email: "abcde123@naver.com",
    education: "",
    major: "",
    specialty: [],
    designStyle: "전문으로 활용하는 분야를 선택해 주세요. (최대 3개)",
  });
  const [originalData, setOriginalData] = useState({
    nickname: "마지막선물",
    phone: "010-1234-5678",
    email: "abcde123@naver.com",
    education: "",
    major: "",
    specialty: [],
    designStyle: "전문으로 활용하는 분야를 선택해 주세요. (최대 3개)",
  });

  const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);

  const specialtyOptions = [
    "로고 디자인",
    "브랜드 디자인",
    "굿즈 디자인",
    "포스터·전단지 디자인",
    "배너·광고 디자인",
    "패키지 디자인",
    "명함·카드·인쇄물 디자인",
  ];

  const handleEdit = (field) => {
    if (field === "education" || field === "major") {
      setOriginalData((prev) => ({
        ...prev,
        education: formData.education,
        major: formData.major,
      }));
      setEditingFields((prev) => ({ ...prev, education: true, major: true }));
    } else {
      setOriginalData((prev) => ({ ...prev, [field]: formData[field] }));
      setEditingFields((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleSave = (field) => {
    if (field === "education" || field === "major") {
      setEditingFields((prev) => ({ ...prev, education: false, major: false }));
      console.log("학력·전공 저장된 데이터:", {
        education: formData.education,
        major: formData.major,
      });
    } else {
      setEditingFields((prev) => ({ ...prev, [field]: false }));
      console.log(`${field} 저장된 데이터:`, formData[field]);
    }
  };

  const handleCancel = (field) => {
    if (field === "education" || field === "major") {
      setFormData((prev) => ({
        ...prev,
        education: originalData.education,
        major: originalData.major,
      }));
      setEditingFields((prev) => ({ ...prev, education: false, major: false }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: originalData[field] }));
      setEditingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecialtySelect = (option) => {
    if (formData.specialty.length < 3 && !formData.specialty.includes(option)) {
      setFormData((prev) => ({
        ...prev,
        specialty: [...prev.specialty, option],
      }));
    }
    setIsSpecialtyDropdownOpen(false);
  };

  const handleSpecialtyRemove = (optionToRemove) => {
    setFormData((prev) => ({
      ...prev,
      specialty: prev.specialty.filter((item) => item !== optionToRemove),
    }));
  };

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">내 정보</h2>
        </div>

        <div className="flex gap-16">
          {/* 프로필 이미지 섹션 */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <img
                src={profileicon}
                alt="프로필"
                className="w-24 h-24 rounded-full"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button className="group">
                <img
                  src={changeicon}
                  alt="프로필 변경"
                  className="w-20 h-8 group-hover:hidden"
                />
                <img
                  src={changeiconhover}
                  alt="프로필 변경"
                  className="w-20 h-8 hidden group-hover:block"
                />
              </button>
              <button className="group">
                <img
                  src={outicon}
                  alt="회원탈퇴"
                  className="w-12 h-5 group-hover:hidden"
                />
                <img
                  src={outiconhover}
                  alt="회원탈퇴"
                  className="w-12 h-5 hidden group-hover:block"
                />
              </button>
            </div>
          </div>

          {/* 사용자 정보 폼 */}
          <div className="flex-1 max-w-2xl">
            {/* 닉네임 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">
                  닉네임
                </label>
                {!editingFields.nickname ? (
                  <button
                    onClick={() => handleEdit("nickname")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave("nickname")}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel("nickname")}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                readOnly={!editingFields.nickname}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.nickname
                    ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                    : "bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                }`}
              />
            </div>

            {/* 전화번호 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">
                  전화번호
                </label>
                {!editingFields.phone ? (
                  <button
                    onClick={() => handleEdit("phone")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave("phone")}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel("phone")}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                readOnly={!editingFields.phone}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.phone
                    ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                    : "bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                }`}
              />
            </div>

            {/* 이메일 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">
                  이메일
                </label>
                {!editingFields.email ? (
                  <button
                    onClick={() => handleEdit("email")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave("email")}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel("email")}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                readOnly={!editingFields.email}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.email
                    ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                    : "bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                }`}
              />
            </div>

            {/* 학력 · 전공 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">
                  학력 · 전공
                </label>
                {!editingFields.education && !editingFields.major ? (
                  <button
                    onClick={() => handleEdit("education")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave("education")}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel("education")}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  readOnly={!editingFields.education}
                  placeholder="학교명을 입력해 주세요."
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                    !editingFields.education
                      ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                      : "bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  }`}
                />
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => handleInputChange("major", e.target.value)}
                  readOnly={!editingFields.major}
                  placeholder="전공을 입력해 주세요."
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                    !editingFields.major
                      ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                      : "bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>

            {/* 전문 분야 - 멀티 셀렉트 드롭다운 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">
                  전문 분야
                </label>
                {!editingFields.specialty ? (
                  <button
                    onClick={() => handleEdit("specialty")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave("specialty")}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel("specialty")}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>

              {/* 선택된 태그들 표시 */}
              {formData.specialty.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {formData.specialty.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-300"
                    >
                      {item}
                      {editingFields.specialty && (
                        <button
                          type="button"
                          onClick={() => handleSpecialtyRemove(item)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              )}

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    editingFields.specialty &&
                    setIsSpecialtyDropdownOpen(!isSpecialtyDropdownOpen)
                  }
                  disabled={!editingFields.specialty}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base text-left flex justify-between items-center ${
                    !editingFields.specialty
                      ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                      : "bg-white text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={
                      formData.specialty.length === 0
                        ? "text-gray-500"
                        : "text-gray-900"
                    }
                  >
                    전문으로 활용하는 분야를 선택해 주세요. (최대 3개)
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 드롭다운 메뉴 */}
                {isSpecialtyDropdownOpen && editingFields.specialty && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                    {specialtyOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSpecialtySelect(option)}
                        disabled={
                          formData.specialty.includes(option) ||
                          formData.specialty.length >= 3
                        }
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl border-b border-gray-100 last:border-b-0 ${
                          formData.specialty.includes(option)
                            ? "bg-gray-100 text-gray-900 font-semibold cursor-not-allowed"
                            : formData.specialty.length >= 3
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-900"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 디자인 스타일 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">
                  디자인 스타일
                </label>
                {!editingFields.designStyle ? (
                  <button
                    onClick={() => handleEdit("designStyle")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave("designStyle")}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel("designStyle")}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <select
                  value={formData.designStyle}
                  onChange={(e) =>
                    handleInputChange("designStyle", e.target.value)
                  }
                  disabled={!editingFields.designStyle}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base appearance-none ${
                    !editingFields.designStyle
                      ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                      : "bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  }`}
                >
                  <option value="전문으로 활용하는 분야를 선택해 주세요. (최대 3개)">
                    전문으로 활용하는 분야를 선택해 주세요. (최대 3개)
                  </option>
                  <option value="미니멀 스타일">미니멀 스타일</option>
                  <option value="빈티지 스타일">빈티지 스타일</option>
                  <option value="모던 스타일">모던 스타일</option>
                  <option value="클래식 스타일">클래식 스타일</option>
                  <option value="컨템포러리 스타일">컨템포러리 스타일</option>
                  <option value="일러스트레이션 스타일">
                    일러스트레이션 스타일
                  </option>
                  <option value="타이포그래피 중심">타이포그래피 중심</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
