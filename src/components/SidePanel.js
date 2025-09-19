import React, { useState } from 'react';
import './SIdePanel.css'; // 스타일링을 위한 CSS 파일
// ✅ startLocation을 props로 받도록 수정
function ResultItem({ item, startLocation }) {
    const distanceInMeters = Math.round(item.distance * 1000);
    const travelTime = Math.ceil((item.distance / 4) * 60);

    // ✅ 보내주신 가이드에 맞춘 새로운 길찾기 URL 생성
    const startName = encodeURIComponent("내 위치");
    const endName = encodeURIComponent(item.name);

    // /link/from/이름,위도,경도/to/이름,위도,경도 형식
    const routeUrl = `https://map.kakao.com/link/from/${startName},${startLocation.lat},${startLocation.lng}/to/${endName},${item.latitude},${item.longitude}`;

    return (
        <li className="list-item">
            <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-details">
                    거리: {distanceInMeters}m | 예상 시간: 약 {travelTime}분
                </span>
            </div>
            <a href={routeUrl} target="_blank" rel="noreferrer">
                <button className="search-button">경로 검색</button>
            </a>
        </li>
    );
}


// ✅ startLocation을 props로 받도록 수정
function SidePanel({ results, startLocation }) {
    const [isOpen, setIsOpen] = useState(false);
    const togglePanel = () => setIsOpen(!isOpen);

    return (
        <div className={`side-panel ${isOpen ? 'open' : ''}`}>
            <div className="toggle-button" onClick={togglePanel}>
                {isOpen ? '›' : '‹'}
            </div>
            <div className="panel-content">
                <h2>추천 관광지 목록</h2>
                {results.length > 0 ? (
                    <ul className="results-list">
                        {results.map((item, index) => (
                            // ✅ startLocation을 ResultItem에 전달
                            <ResultItem key={index} item={item} startLocation={startLocation} />
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default SidePanel;