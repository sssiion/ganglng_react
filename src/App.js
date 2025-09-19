import React, { useState } from 'react';
import axios from 'axios';
import MapContainer from './components/MapContainer';
import ControlPanel from './components/ControlPanel';
import SidePanel from './components/SidePanel';
import './App.css';

function App() {
  // --- 상태 관리 ---
  const [mapCenter, setMapCenter] = useState({ lat: 37.773, lng: 128.889 }); // 지도 중심 좌표
  const [searchResults, setSearchResults] = useState([]); // 우리 API 결과
  const [loading, setLoading] = useState(false);

  // --- API 호출 함수 ---
  const fetchRecommendations = async (lat, lon, keyword, time) => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`/api/recommendations`, {
        params: { lat, lon, keyword, time }
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("API 호출 중 오류 발생!", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

   return (
        <div className="App">
            <MapContainer center={mapCenter} searchResults={searchResults} />
            <ControlPanel
                mapCenter={mapCenter} // ✅ 이 라인 추가
                setMapCenter={setMapCenter}
                fetchRecommendations={fetchRecommendations}
                loading={loading}
            />
            <SidePanel results={searchResults} startLocation={mapCenter} />

        </div>
    );
}

export default App;
