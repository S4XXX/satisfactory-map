import {
  MarkerFragment,
  ResourceNodeType,
  SlugType,
  MarkerSlugInlineFragment,
  MarkerResourceNodeInlineFragment,
  MarkerDropPodInlineFragment,
  ArtifactType,
  MarkerArtifactInlineFragment
} from "../../../__generated__";

type NodeTypes = Exclude<
  ResourceNodeType,
  ResourceNodeType.Geyser | ResourceNodeType.Unknown
>;

type SlugMarker = MarkerFragment & { target: MarkerSlugInlineFragment };
type ResourceNodeMarker = MarkerFragment & {
  target: MarkerResourceNodeInlineFragment;
};
type ArtifactMarker = MarkerFragment & {
  target: MarkerArtifactInlineFragment;
};
type DropPodMarker = MarkerFragment & { target: MarkerDropPodInlineFragment };

type MarkerTree = {
  slugs: { [k in SlugType]: SlugMarker[] };
  nodes: { [k in NodeTypes]: ResourceNodeMarker[] };
  artifacts: { [k in ArtifactType]: ArtifactMarker[] };
  geysers: ResourceNodeMarker[];
  unknowns: ResourceNodeMarker[];
  dropPods: DropPodMarker[];
};

let tree: MarkerTree = {
  slugs: {
    GREEN: [],
    PURPLE: [],
    YELLOW: []
  },
  nodes: {
    BAUXITE: [],
    CATERIUM: [],
    COAL: [],
    COPPER: [],
    IRON: [],
    LIMESTONE: [],
    OIL: [],
    QUARTZ: [],
    SAM: [],
    SULFUR: [],
    URANIUM: []
  },
  geysers: [],
  unknowns: [],
  dropPods: []
};

let MLENGTH = 0;

export function sortMarkers(markers: MarkerFragment[]) {
  if (markers.length === MLENGTH) {
    return tree;
  } else {
    MLENGTH = markers.length;
    tree = {
      slugs: {
        GREEN: [],
        PURPLE: [],
        YELLOW: []
      },
      nodes: {
        BAUXITE: [],
        CATERIUM: [],
        COAL: [],
        COPPER: [],
        IRON: [],
        LIMESTONE: [],
        OIL: [],
        QUARTZ: [],
        SAM: [],
        SULFUR: [],
        URANIUM: []
      },
      artifacts: {
        SOMERSLOOP: [],
        MERCER: []
      },
      geysers: [],
      unknowns: [],
      dropPods: []
    };
  }

  markers.forEach(m => {
    if (
      m.target.__typename === "ResourceNode" &&
      m.target.rnType === ResourceNodeType.Geyser
    ) {
      tree.geysers.push(m as ResourceNodeMarker);
    } else if (
      m.target.__typename === "ResourceNode" &&
      m.target.rnType === ResourceNodeType.Unknown
    ) {
      tree.unknowns.push(m as ResourceNodeMarker);
    } else if (m.target.__typename === "Artifact") {
      tree.artifacts[m.target.artifactType].push(m as ArtifactMarker);
    } else if (m.target.__typename === "ResourceNode") {
      tree.nodes[m.target.rnType as NodeTypes].push(m as ResourceNodeMarker);
    } else if (m.target.__typename === "DropPod") {
      tree.dropPods.push(m as DropPodMarker);
    } else if (m.target.__typename === "Slug") {
      tree.slugs[m.target.slugType].push(m as SlugMarker);
    }
  });

  return tree;
}
