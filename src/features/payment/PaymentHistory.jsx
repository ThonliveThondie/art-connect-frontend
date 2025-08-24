import React, { useState } from "react";

const payments = [
  {
    date: "2025-08-21",
    orderNumber: "#1234567",
    name: "김철수",
    amount: 50000,
    status: "결제 완료",
  },
  {
    date: "2025-07-25",
    orderNumber: "#1234568",
    name: "박영희",
    amount: 75000,
    status: "결제 완료",
  },
  {
    date: "2025-05-15",
    orderNumber: "#1234569",
    name: "이민수",
    amount: 120000,
    status: "결제 완료",
  },
  {
    date: "2025-02-20",
    orderNumber: "#1234570",
    name: "최지은",
    amount: 98000,
    status: "결제 완료",
  },
  {
    date: "2024-10-01",
    orderNumber: "#1234571",
    name: "강진호",
    amount: 50000,
    status: "결제 완료",
  },
];

export default function PaymentHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const periods = ["전체", "1개월", "3개월", "6개월", "1년"];

  // 현재 날짜 (2025-08-20 기준)
  const today = new Date("2025-08-20");

  // 기간 필터링 함수
  const filterByPeriod = (paymentDate) => {
    const date = new Date(paymentDate);
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
  const filterBySearch = (payment) => {
    if (!searchQuery) return true;
    return (
      payment.name.includes(searchQuery) ||
      payment.orderNumber.includes(searchQuery) ||
      payment.date.includes(searchQuery)
    );
  };

  // 필터링된 결제 내역
  const filteredPayments = payments.filter(
    (payment) => filterByPeriod(payment.date) && filterBySearch(payment)
  );

  return (
    <div
      className="p-6 font-medium max-w-4xl mx-auto"
      style={{
        fontFamily: "Pretendard Variable",
        fontWeight: 500,
        fontSize: 16,
      }}
    >
      {/* 결제 내역 제목 */}
      <h1 className="text-lg mb-4">결제 내역</h1>

      {/* 검색창과 기간 설정 버튼들 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-grow">
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
        <div className="flex gap-3">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`rounded-xl border px-5 py-3 text-sm shadow-sm transition-colors whitespace-nowrap ${
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
      <div className="grid grid-cols-5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium text-sm px-6 py-3 mb-4">
        <div>날짜</div>
        <div>주문번호</div>
        <div>이름</div>
        <div>금액</div>
        <div>결제 상태</div>
      </div>

      {/* 결제 내역 리스트 */}
      <div className="space-y-3">
        {filteredPayments.map(
          ({ date, orderNumber, name, amount, status }, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 rounded-xl bg-white border border-gray-200 py-4 px-6 text-sm text-gray-700"
            >
              <div className="flex items-center">{date.replace(/-/g, ".")}</div>
              <div className="flex items-center">{orderNumber}</div>
              <div className="flex items-center">{name}</div>
              <div className="flex items-center">{amount.toLocaleString()}</div>
              <div className="flex items-center">{status}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
