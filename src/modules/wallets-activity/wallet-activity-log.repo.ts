import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Injectable } from "@nestjs/common";
import { WalletActivityLogs } from "./model/log.model";

@Injectable()
export class WalletActivityLogRepo extends AbstractRepo<WalletActivityLogs> {
  constructor() {
    super(WalletActivityLogs);
  }
}
