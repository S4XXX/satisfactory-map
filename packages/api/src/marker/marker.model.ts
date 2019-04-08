import { Resource } from "../common/common.model";
import { Column, Entity } from "typeorm";

@Entity()
export class Marker extends Resource {
  @Column({
    type: "text",
    enum: ["RESOURCE_NODE", "SLUG", "DROP_POD", "ARTIFACT"]
  })
  targetType: "RESOURCE_NODE" | "SLUG" | "DROP_POD" | "ARTIFACT";

  @Column()
  targetId: number;

  @Column({ type: "float" })
  x: number;

  @Column({ type: "float" })
  y: number;

  @Column({ type: "float" })
  z: number;

  @Column({ default: false })
  obstructed: boolean;

  @Column({ nullable: true })
  information?: string;
}
