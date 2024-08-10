import { Body, Controller, Get, Post } from "@nestjs/common";
import { WalletActivityService } from "./wallet-activity.service";
import { webHookData } from "./dto/wallet-activity.dto";

@Controller()
export class WalletActivityController {
  constructor(private readonly walletActivityService: WalletActivityService) {}

  @Post("/wallet-webhook")
  async webhookData(@Body() dto: Record<string, any>[]) {
    return this.walletActivityService.handleWebHook(dto);
  }
}
