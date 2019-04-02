import React from "react";
import MarkerClusterGroup, {
  MarkerClusterGroupProps
} from "react-leaflet-markercluster";
import { CircleMarker, Popup, Marker } from "react-leaflet";
import { getSlugColor } from "../../../../utils/getSlugColor";
import { DropPodIcon } from "../DropPodMarker/DropPodMarker";
import { RNMarkerIcon } from "../RNMarker/RNMarker";

type Props = {
  markerSize: number;
};

export const Markers = (props: Props) => {
  const { markerSize } = props;
  const markers = window.SERVER_DATA.markers;

  const clusterProps: MarkerClusterGroupProps = {
    removeOutsideVisibleBounds: true,
    maxClusterRadius: 0
  };

  return (
    <React.Fragment>
      {Object.keys(markers.RNO).map(key => (
        <MarkerClusterGroup key={key} {...clusterProps}>
          {markers.RNO[key as keyof typeof markers["RNO"]].map(m => (
            <Marker
              icon={RNMarkerIcon({
                iconSize: markerSize,
                obstructed: m.obs,
                // @ts-ignore
                type: key,
                // @ts-ignore
                quality: m.qua
              })}
              key={m.mid}
              position={m.pos}
            />
          ))}
        </MarkerClusterGroup>
      ))}
      {Object.keys(markers.SLU).map(key => (
        <MarkerClusterGroup key={key} {...clusterProps}>
          {markers.SLU[key as keyof typeof markers["SLU"]].map(m => (
            <CircleMarker
              radius={(markerSize - 10) / 2}
              stroke={true}
              color={"#fff"}
              weight={2}
              fill={true}
              fillOpacity={1}
              fillColor={getSlugColor(key as keyof typeof markers["SLU"])}
              key={m.mid}
              center={m.pos}
            />
          ))}
        </MarkerClusterGroup>
      ))}
      <MarkerClusterGroup {...clusterProps}>
        {markers.DPO.map(m => (
          <Marker
            icon={DropPodIcon({ iconSize: markerSize })}
            key={m.mid}
            position={m.pos}
          />
        ))}
      </MarkerClusterGroup>
    </React.Fragment>
  );
};
