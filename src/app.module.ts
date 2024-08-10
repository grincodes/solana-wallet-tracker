import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./libs/db/DatabaseModule";
import { WalletActivityModule } from "./modules/wallets-activity/wallet-activity.module";

@Module({
  imports: [DatabaseModule, WalletActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
