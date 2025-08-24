import React, { useState } from "react";

const incomeData = [
  // 8월 - 현재월
  {
    date: "2025-08-15",
    project: "로고 디자인",
    category: "로고 디자인",
    amount: 150000,
  },
  {
    date: "2025-08-10",
    project: "브랜드 아이덴티티 개발",
    category: "브랜드 디자인",
    amount: 120000,
  },
  // 7월
  {
    date: "2025-07-25",
    project: "굿즈 패키지 디자인",
    category: "굿즈 디자인",
    amount: 80000,
  },
  {
    date: "2025-07-10",
    project: "포스터 제작",
    category: "포스터 전단지 디자인",
    amount: 95000,
  },
  // 6월
  {
    date: "2025-06-20",
    project: "베너 광고 디자인",
    category: "베너지 디자인",
    amount: 75000,
  },
  {
    date: "2025-06-05",
    project: "명함 카드 디자인",
    category: "명함 카드 인쇄물 디자인",
    amount: 45000,
  },
  // 5월
  {
    date: "2025-05-30",
    project: "브랜드 로고 수정",
    category: "브랜드 디자인",
    amount: 85000,
  },
  {
    date: "2025-05-18",
    project: "상품 패키지 디자인",
    category: "굿즈 디자인",
    amount: 110000,
  },
  // 4월
  {
    date: "2025-04-22",
    project: "이벤트 포스터",
    category: "포스터 전단지 디자인",
    amount: 90000,
  },
  {
    date: "2025-04-08",
    project: "온라인 베너 제작",
    category: "베너지 디자인",
    amount: 65000,
  },
  // 3월
  {
    date: "2025-03-28",
    project: "로고 브랜딩 작업",
    category: "로고 디자인",
    amount: 180000,
  },
  {
    date: "2025-03-15",
    project: "명함 리뉴얼",
    category: "명함 카드 인쇄물 디자인",
    amount: 55000,
  },
  // 2월
  {
    date: "2025-02-25",
    project: "굿즈 스티커 디자인",
    category: "굿즈 디자인",
    amount: 70000,
  },
  {
    date: "2025-02-12",
    project: "브로셔 디자인",
    category: "포스터 전단지 디자인",
    amount: 130000,
  },
  // 1월
  {
    date: "2025-01-28",
    project: "신년 포스터",
    category: "포스터 전단지 디자인",
    amount: 100000,
  },
  {
    date: "2025-01-15",
    project: "회사 로고 제작",
    category: "로고 디자인",
    amount: 160000,
  },
];

export default function IncomeHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const periods = ["전체", "1개월", "3개월", "6개월", "1년"];

  // 현재 날짜 (2025-08-20 기준)
  const today = new Date("2025-08-20");
  const currentMonth = today.getMonth() + 1; // 8월

  // 기간 필터링 함수
  const filterByPeriod = (incomeDate) => {
    const date = new Date(incomeDate);
    const monthsDiff =
      (today.getFullYear() - date.getFullYear()) * 12 +
      (today.getMonth() - date.getMonth());

    switch (selectedPeriod) {
      case "1개월":
        return monthsDiff < 1;
      case "3개월":
        return monthsDiff < 3;
      case "6개월":
        return monthsDiff < 6;
      case "1년":
        return monthsDiff < 12;
      default:
        return true;
    }
  };

  // 검색 필터링 함수
  const filterBySearch = (income) => {
    if (!searchQuery) return true;
    return (
      income.project.includes(searchQuery) ||
      income.category.includes(searchQuery) ||
      income.date.includes(searchQuery)
    );
  };

  // 필터링된 수입 내역
  const filteredIncome = incomeData.filter(
    (income) => filterByPeriod(income.date) && filterBySearch(income)
  );

  // 월별 수입 계산
  const monthlyIncome = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const monthlyData = incomeData.filter((income) => {
      const incomeDate = new Date(income.date);
      const incomeMonth = incomeDate.getMonth() + 1;
      const incomeYear = incomeDate.getFullYear();
      return incomeMonth === month && incomeYear === 2025;
    });
    return monthlyData.reduce((sum, income) => sum + income.amount, 0);
  });

  const maxIncome = Math.max(...monthlyIncome);
  const totalIncome = monthlyIncome.reduce((sum, amount) => sum + amount, 0);

  return (
    <div
      className="flex justify-center p-6 font-medium"
      style={{
        fontFamily: "Pretendard Variable",
        fontWeight: 500,
        fontSize: 16,
      }}
    >
      <div className="max-w-5xl w-full">
        {/* 월별 수입 그래프 섹션 */}
        <div className="mb-12">
          <h2 className="text-lg mb-2">월별 수입 그래프</h2>
          <p className="text-sm text-gray-600 mb-8">
            1월 수입 {totalIncome.toLocaleString()} 원
          </p>

          {/* 차트 영역 */}
          <div className="flex items-end justify-between gap-2 h-64 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            {monthlyIncome.map((amount, index) => {
              const month = index + 1;
              const isCurrentMonth = month === currentMonth;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`rounded-t w-full mb-2 transition-all duration-300 ${
                      isCurrentMonth
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    style={{
                      height:
                        maxIncome > 0
                          ? `${(amount / maxIncome) * 180}px`
                          : "8px",
                    }}
                  ></div>
                  <span
                    className={`text-xs ${
                      isCurrentMonth
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {month}월
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 수입 내역 섹션 */}
        <div>
          <h1 className="text-lg mb-4">수입 내역</h1>

          {/* 검색창과 기간 설정 버튼들 - 비율 조정 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-2/5">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-100 pr-12 pl-4 py-3 placeholder-gray-500 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex gap-3 w-3/5 justify-end">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`flex-1 rounded-xl border px-5 py-3 text-sm shadow-sm transition-colors whitespace-nowrap ${
                    selectedPeriod === period
                      ? "border-gray-400 bg-gray-200"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* 테이블 헤더 */}
          <div className="grid grid-cols-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium text-sm px-6 py-3 mb-4">
            <div>날짜</div>
            <div>프로젝트명</div>
            <div>카테고리</div>
            <div>금액</div>
          </div>

          {/* 수입 내역 리스트 */}
          <div className="space-y-3">
            {filteredIncome.map(
              ({ date, project, category, amount }, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 rounded-xl bg-white border border-gray-200 py-4 px-6 text-sm text-gray-700"
                >
                  <div className="flex items-center">
                    {date.replace(/-/g, ".")}
                  </div>
                  <div className="flex items-center">{project}</div>
                  <div className="flex items-center">{category}</div>
                  <div className="flex items-center">
                    {amount.toLocaleString()}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
