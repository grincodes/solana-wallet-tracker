import { Injectable } from "@nestjs/common";
import { handleErrorCatch } from "src/libs/common/helpers/utils";

import { success } from "src/libs/common/types/response";
import { WalletActivityRepo } from "./wallet-activity.repo";
import { CreateWalletActivityDto } from "./dto/wallet-activity.dto";
import { WalletActivityLogRepo } from "./wallet-activity-log.repo";
import { Config } from "src/config";
import axios from "axios";

@Injectable()
export class WalletActivityService {
  constructor(
    private readonly walletActivityRepo: WalletActivityRepo,
    private readonly walletActivityLogRepo: WalletActivityLogRepo
  ) {}

  async saveWalletActivityService(
    createWalletActivityDto: CreateWalletActivityDto
  ) {
    try {
      const res = await this.walletActivityRepo.save(createWalletActivityDto);

      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async sendTelegramMessage(message: string) {
    try {
      const url = `https://api.telegram.org/bot${Config.BOT_TOKEN}/sendMessage`;
      const payload = {
        chat_id: Config.CHAT_ID,
        text: message,
        parse_mode: "HTML",
      };
      await axios.post(url, payload);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");

      throw error;
    }
  }

  async handleWebHook(dto: Record<string, any>) {
    try {
      const data = dto[0];

      const walletActivity = {
        sourceWallet: data?.feePayer,
        tokenTransfers: data?.tokenTransfers,
        txType: data?.type,
        txRef: data?.signature,
        timestamp: data?.timestamp,
      };
      await this.walletActivityLogRepo.save({ data });
      await this.saveWalletActivityService(walletActivity);

      await this.sendTelegramMessage(`
        
        <b>Transaction Wallet Alert </b> 

        <pre>Transaction Ref: ${walletActivity.txRef} </pre> 
         <pre>${JSON.stringify(walletActivity, null, 2)}</pre>
        `);

      return success("true");
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
