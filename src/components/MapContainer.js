import React from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

function MapContainer({ center, searchResults }) {
  return (
    <Map
      center={center}
      style={{ width: "100%", height: "100vh" }}
      level={4}
    >
      {/* 현재 위치 마커 (예시) */}
      <MapMarker position={center} />

      {/* API 결과 마커 */}
      {searchResults.map((item, index) => (
        <MapMarker
          key={index}
          position={{ lat: item.latitude, lng: item.longitude }}
          title={item.name}
        />
      ))}
      
      {/* ✅ 지도 타입 컨트롤러 추가 */}
      <MapTypeControl position={"TOPRIGHT"} />
      {/* ✅ 줌 컨트롤러 추가 */}
      <ZoomControl position={"RIGHT"} />
    </Map>
  );
}

export default MapContainer;