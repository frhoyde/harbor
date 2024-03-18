"use client";
import Map from "react-map-gl/maplibre";
const StorageMap = () => {
  return (
    <>
      {" "}
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "24px",
        }}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=P1q3QkJ0UO0odYdb0d4N"
      />
    </>
  );
};

export default StorageMap;
