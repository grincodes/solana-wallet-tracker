import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Injectable } from "@nestjs/common";
import { WalletActivity } from "./model/wallet-activity.model";


@Injectable()
export class WalletActivityRepo extends AbstractRepo<WalletActivity> {
  constructor() {
    super(WalletActivity);
  }

}
