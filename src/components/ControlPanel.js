import React, { useState } from 'react';
import './ControlPanel.css';

function ControlPanel({ mapCenter, setMapCenter, fetchRecommendations, loading }) {
    const [keyword, setKeyword] = useState(''); // 출발 장소 검색 키워드
    const [recommendKeyword, setRecommendKeyword] = useState(''); // 추천받을 키워드
    const [time, setTime] = useState('09:00'); // 시간 상태
    const [places, setPlaces] = useState([]); // 장소 검색 API 결과 목록

    // 카카오맵 장소 검색 기능 호출
    const searchPlace = () => {
        const ps = new window.kakao.maps.services.Places();
        if (!keyword.trim()) {
            alert("검색할 장소를 입력하세요.");
            return;
        }
        ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data); // 검색 결과를 목록으로 보여주기 위해 상태에 저장
            } else {
                alert("장소 검색에 실패했습니다.");
                setPlaces([]);
            }
        });
    };
    
    // 장소 목록에서 특정 장소를 클릭했을 때
    const handlePlaceClick = (place) => {
        const newCenter = { lat: parseFloat(place.y), lng: parseFloat(place.x) };
        setMapCenter(newCenter); // 지도를 해당 위치로 이동
        setKeyword(place.place_name); // 입력창에 선택한 장소 이름으로 업데이트
        setPlaces([]); // 선택했으므로 결과 목록은 숨김
    };

    // 최종 '추천 검색' 버튼 클릭 시 실행
    const handleRecommendSearch = () => {
        // App.js로부터 받은 mapCenter의 현재 좌표를 사용
        fetchRecommendations(mapCenter.lat, mapCenter.lng, recommendKeyword, time);
    };

    return (
        <div className="control-panel">
            {/* --- 1. 출발 장소 검색 --- */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="출발 장소 검색 (예: 강릉역)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchPlace()}
                />
                <button onClick={searchPlace}>위치 검색</button>
            </div>
            
            {/* 장소 검색 결과 목록 */}
            {places.length > 0 && (
                <ul className="places-list">
                    {places.map((place, index) => (
                        <li key={index} onClick={() => handlePlaceClick(place)}>
                            <span className="place-name">{place.place_name}</span>
                            <span className="place-address">{place.road_address_name || place.address_name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* --- 2. 추천 조건 입력 (키워드 + 시간) --- */}
            <div className="recommend-box">
                <input 
                    type="text"
                    placeholder="추천받을 키워드 (예: 카페)"
                    value={recommendKeyword}
                    onChange={(e) => setRecommendKeyword(e.target.value)}
                />
                <input 
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button onClick={handleRecommendSearch} disabled={loading}>
                    {loading ? '검색 중...' : '추천 검색'}
                </button>
            </div>
        </div>
    );
}

export default ControlPanel;