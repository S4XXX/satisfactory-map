import { Entity, Column } from "typeorm";
import { Resource } from "../common/common.model";

@Entity()
export class Artifact extends Resource {
  @Column({ type: "text" })
  type: "SOMERSLOOP" | "MERCER";

  @Column()
  originId: string;
}
