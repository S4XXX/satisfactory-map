import { Marker } from "react-leaflet";
import * as L from "leaflet";
import {
  MarkerFragment,
  MarkerDropPodInlineFragment
} from "../../../../__generated__";
import { useTheme } from "../../../../themes/styled";
import { renderToStaticMarkup } from "react-dom/server";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerDropPodInlineFragment };
  iconSize: number;
};

export const DropPodMarker = (props: Props) => {
  const { marker, iconSize } = props;
  const {
    colors: {
      markers: { dropPod }
    }
  } = useTheme();

  return (
    <Marker icon={generateIcon(dropPod, iconSize)} position={marker}>
      <Popup>
        <p>DropPod #{marker.target.id}</p>
        <ul>
          <li>
            <b>X:</b> {marker.lng}
          </li>
          <li>
            <b>Y:</b> {marker.lat}
          </li>
          <li>
            <b>Z:</b> {marker.alt}
          </li>
        </ul>
        <p>Requirements</p>
        {marker.target.requirement ? (
          <ul>
            <li>
              <b>Power:</b> {marker.target.requirement.powerNeeded || "none"}
            </li>
            <li>
              <b>Item:</b>{" "}
              {marker.target.requirement.itemName
                ? `${marker.target.requirement.itemQuantity} ${
                    marker.target.requirement.itemName
                  }`
                : "none"}
            </li>
          </ul>
        ) : (
          <p>None</p>
        )}
      </Popup>
    </Marker>
  );
};

const generateIcon = (color: string, iconSize: number) =>
  L.divIcon({
    iconSize: [30 * iconSize, 30 * iconSize],
    html: renderToStaticMarkup(
      <svg
        height="40"
        width="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width={30 * iconSize}
          height={30 * iconSize}
          rx="8"
          fill={color}
          stroke="#fff"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </svg>
    )
  });
