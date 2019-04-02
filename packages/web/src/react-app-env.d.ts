/// <reference types="react-scripts" />

declare global {
  interface Window {
    readonly SERVER_DATA: {
      markers: {
        RNO: {
          IRON: SSRRNOMarker[];
          COPPER: SSRRNOMarker[];
          LIMESTONE: SSRRNOMarker[];
          BAUXITE: SSRRNOMarker[];
          URANIUM: SSRRNOMarker[];
          COAL: SSRRNOMarker[];
          OIL: SSRRNOMarker[];
          SULFUR: SSRRNOMarker[];
          QUARTZ: SSRRNOMarker[];
          SAM: SSRRNOMarker[];
          CATERIUM: SSRRNOMarker[];
          GEYSER: SSRRNOMarker[];
          UNKNOWN: SSRRNOMarker[];
        };
        SLU: {
          GREEN: SSRSLUMarker[];
          YELLOW: SSRSLUMarker[];
          PURPLE: SSRSLUMarker[];
        };
        DPO: SSRDPOMarker[];
      };
    };
  }
}

export type SSRMarker = {
  pos: { lat: number; lng: number; alt: number };
  obs: boolean;
  mid: number;
  tid: number;
};

export enum SSRRNType {
  IRON,
  COPPER,
  LIMESTONE,
  BAUXITE,
  URANIUM,
  COAL,
  OIL,
  SULFUR,
  QUARTZ,
  SAM,
  CATERIUM,
  GEYSER,
  UNKNOWN
}

export type SSRRNOMarker = SSRMarker & { qua: number };
export type SSRGEYMarker = SSRMarker & {};
export type SSRSLUMarker = SSRMarker & {};
export type SSRDPOMarker = SSRMarker & {};
