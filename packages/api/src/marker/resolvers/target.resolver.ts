import { IResolvers, MarkerTarget } from "../../types";
import { Marker } from "../marker.model";
import { getRepository, ObjectType } from "typeorm";
import { ResourceNode } from "../../resourceNode/resourceNode.model";
import { Slug } from "../../slug/slug.model";
import { DropPod } from "../../dropPod/dropPod.model";
import { Artifact } from "../../artifact/artifact.model";

export default {
  MarkerTarget: {
    __resolveType: _ => {
      if (_ instanceof ResourceNode) {
        return "ResourceNode";
      } else if (_ instanceof Slug) {
        return "Slug";
      } else if (_ instanceof DropPod) {
        return "DropPod";
      } else if (_ instanceof Artifact) {
        return "Artifact";
      }

      throw new Error("Unsupported MarkerTarget Type");
    }
  },
  Marker: {
    target: _ => {
      const repos: { [k in Marker["targetType"]]: ObjectType<MarkerTarget> } = {
        RESOURCE_NODE: ResourceNode,
        SLUG: Slug,
        DROP_POD: DropPod,
        ARTIFACT: Artifact
      };

      return getRepository(repos[_.targetType]).findOne(_.targetId) as Promise<
        MarkerTarget
      >;
    }
  }
} as IResolvers;
