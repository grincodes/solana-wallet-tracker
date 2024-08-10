import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "src/libs/db/BaseEntity";

@Entity("wallet-activity")
export class WalletActivity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  sourceWallet: string;

  @Column({ type: "jsonb" })
  tokenTransfers: Record<string, any>;

  @Column()
  txType?: string;

  @Column()
  txRef?: string;

  @Column()
  timestamp: string;
}
