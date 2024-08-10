import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "src/libs/db/BaseEntity";

@Entity("wallet-activity-logs")
export class WalletActivityLogs extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "jsonb" })
  data: Record<string, any>;
}
