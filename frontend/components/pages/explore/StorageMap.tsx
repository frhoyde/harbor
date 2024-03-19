"use client";
import { IStorage } from "@/types";
import { useMemo } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import Pin from "./Pin";
const StorageMap = ({ storages }: { storages: IStorage[] }) => {
  const pins = useMemo(
    () =>
      storages.map((storage, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={storage.location.lng}
          latitude={storage.location.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
          }}
        >
          <Pin storage={storage} />
        </Marker>
      )),
    [storages]
  );
  return (
    <>
      <Map
        initialViewState={{
          longitude: -86.56,
          latitude: 36.330056,
          zoom: 12,
        }}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "24px",
        }}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=P1q3QkJ0UO0odYdb0d4N"
      >
        {pins}
      </Map>
    </>
  );
};

export default StorageMap;
