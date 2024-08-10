import { Module } from "@nestjs/common";
import { WalletActivityController } from "./wallet-activity.controller";
import { WalletActivityService } from "./wallet-activity.service";
import { WalletActivityLogRepo } from "./wallet-activity-log.repo";
import { WalletActivityRepo } from "./wallet-activity.repo";

@Module({
  controllers: [WalletActivityController],
  providers: [WalletActivityLogRepo, WalletActivityRepo, WalletActivityService],
})
export class WalletActivityModule {}
