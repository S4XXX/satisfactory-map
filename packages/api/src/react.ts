import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import { getRepository } from "typeorm";
import { Marker } from "./marker/marker.model";
import { DropPod } from "./dropPod/dropPod.model";
import { Slug } from "./slug/slug.model";
import { ResourceNode } from "./resourceNode/resourceNode.model";

export type SSRMarker = {
  pos: { lat: number; lng: number; alt: number };
  mid: number;
  tid: number;
  obs: boolean;
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

export function applyReactMiddleware(app: express.Application) {
  if (process.env.NODE_ENV === "production") {
    app.get("/", async (req, res) => {
      console.time("marker_injection");

      const data = await generateMarkersData();

      fs.readFile(
        path.join(__dirname, "../../web/build/index.html"),
        (err, file) => {
          const parsedIndex = file
            .toString()
            .replace("__SERVER_DATA__", JSON.stringify(data));

          console.timeEnd("marker_injection");
          res.send(parsedIndex);
        }
      );
    });

    app.get(
      "/static",
      express.static(path.join(__dirname, "../../web/build"), {
        maxAge: 31536000
      })
    );

    app.use(express.static(path.join(__dirname, "../../web/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../web/build", "index.html"));
    });
  } else {
    app.get("*", (req, res) => res.redirect("/graphql"));
  }
}

async function generateMarkersData() {
  const [markers, dropPods, slugs, resourceNodes] = await Promise.all([
    getRepository(Marker).find({ order: { id: "ASC" } }),
    getRepository(DropPod).find({ order: { id: "ASC" } }),
    getRepository(Slug).find({ order: { id: "ASC" } }),
    getRepository(ResourceNode).find({ order: { id: "ASC" } })
  ]);

  const data = {
    markers: {
      RNO: {
        IRON: [] as SSRRNOMarker[],
        COPPER: [] as SSRRNOMarker[],
        LIMESTONE: [] as SSRRNOMarker[],
        BAUXITE: [] as SSRRNOMarker[],
        URANIUM: [] as SSRRNOMarker[],
        COAL: [] as SSRRNOMarker[],
        OIL: [] as SSRRNOMarker[],
        SULFUR: [] as SSRRNOMarker[],
        QUARTZ: [] as SSRRNOMarker[],
        SAM: [] as SSRRNOMarker[],
        CATERIUM: [] as SSRRNOMarker[],
        GEYSER: [] as SSRRNOMarker[],
        UNKNOWN: [] as SSRRNOMarker[]
      },
      SLU: {
        GREEN: [] as SSRSLUMarker[],
        YELLOW: [] as SSRSLUMarker[],
        PURPLE: [] as SSRSLUMarker[]
      },
      DPO: [] as SSRDPOMarker[]
    }
  };

  const genSSRMarker = (m: Marker, t: { id: number }): SSRMarker => ({
    mid: m.id,
    obs: m.obstructed,
    pos: {
      lat: m.y,
      lng: m.x,
      alt: m.z
    },
    tid: t.id
  });

  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];

    if (marker.targetType === "DROP_POD") {
      data.markers.DPO.push(
        genSSRMarker(marker, dropPods[marker.targetId - 1])
      );
    } else if (marker.targetType === "RESOURCE_NODE") {
      const target = resourceNodes[marker.targetId - 1];

      data.markers.RNO[target.type].push({
        ...genSSRMarker(marker, target),
        qua:
          target.quality === "IMPURE"
            ? 0
            : target.quality === "NORMAL"
            ? 1
            : target.quality === "PURE"
            ? 2
            : 3
      });
    } else if (marker.targetType === "SLUG") {
      const target = slugs[marker.targetId - 1];

      data.markers.SLU[target.type].push(genSSRMarker(marker, target));
    }
  }

  return data;
}
