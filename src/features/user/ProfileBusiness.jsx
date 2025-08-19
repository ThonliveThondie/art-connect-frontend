import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import profileicon from '@/assets/membership/profile_business/icon/ProfileIcon.png';
import changeicon from '@/assets/membership/profile_business/default/Change.png';
import changeiconhover from '@/assets/membership/profile_business/hover/ChangeHover.png';
import outicon from '@/assets/membership/profile_business/default/Out.png';
import outiconhover from '@/assets/membership/profile_business/hover/OutHover.png';
import marketinput from '@/assets/membership/profile_business/default/MarketInput.png';
import marketinputhover from '@/assets/membership/profile_business/hover/MarketInputHover.png';
import marketinputfilled from '@/assets/membership/profile_business/hover/MarketInputFilled.png';
const UserProfile = () => {
  const navigate = useNavigate();
  const [editingFields, setEditingFields] = useState({
    nickname: false,
    phone: false,
    email: false,
    storeName: false,
  });
  const [formData, setFormData] = useState({
    nickname: '자영업자',
    phone: '010-3456-7890',
    email: 'abcde123@naver.com',
    storeName: '우리 가게',
  });
  const [originalData, setOriginalData] = useState({
    nickname: '자영업자',
    phone: '010-3456-7890',
    email: 'abcde123@naver.com',
    storeName: '우리 가게',
  });

  const handleEdit = (field) => {
    setOriginalData((prev) => ({...prev, [field]: formData[field]}));
    setEditingFields((prev) => ({...prev, [field]: true}));
  };

  const handleSave = (field) => {
    setEditingFields((prev) => ({...prev, [field]: false}));
    console.log(`${field} 저장된 데이터:`, formData[field]);
  };

  const handleCancel = (field) => {
    setFormData((prev) => ({...prev, [field]: originalData[field]}));
    setEditingFields((prev) => ({...prev, [field]: false}));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
              <img src={profileicon} alt="프로필" className="w-24 h-24 rounded-full" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button className="group">
                <img src={changeicon} alt="프로필 변경" className="w-20 h-8 group-hover:hidden" />
                <img src={changeiconhover} alt="프로필 변경" className="w-20 h-8 hidden group-hover:block" />
              </button>
              <button className="group">
                <img src={outicon} alt="회원탈퇴" className="w-12 h-5 group-hover:hidden" />
                <img src={outiconhover} alt="회원탈퇴" className="w-12 h-5 hidden group-hover:block" />
              </button>
            </div>
          </div>

          {/* 사용자 정보 폼 */}
          <div className="flex-1 max-w-2xl">
            {/* 닉네임 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">닉네임</label>
                {!editingFields.nickname ? (
                  <button
                    onClick={() => handleEdit('nickname')}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave('nickname')}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel('nickname')}
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
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                readOnly={!editingFields.nickname}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.nickname
                    ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                    : 'bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                }`}
              />
            </div>

            {/* 전화번호 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">전화번호</label>
                {!editingFields.phone ? (
                  <button
                    onClick={() => handleEdit('phone')}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave('phone')}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel('phone')}
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
                onChange={(e) => handleInputChange('phone', e.target.value)}
                readOnly={!editingFields.phone}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.phone
                    ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                    : 'bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                }`}
              />
            </div>

            {/* 이메일 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">이메일</label>
                {!editingFields.email ? (
                  <button
                    onClick={() => handleEdit('email')}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave('email')}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel('email')}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                readOnly={!editingFields.email}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.email
                    ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                    : 'bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                }`}
              />
            </div>

            {/* 매장명 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-900 text-base font-semibold">매장명</label>
                {!editingFields.storeName ? (
                  <button
                    onClick={() => handleEdit('storeName')}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    수정
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave('storeName')}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => handleCancel('storeName')}
                      className="text-gray-600 text-sm font-medium hover:underline"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                readOnly={!editingFields.storeName}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-base ${
                  !editingFields.storeName
                    ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                    : 'bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
