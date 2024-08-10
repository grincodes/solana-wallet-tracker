export class CreateWalletActivityDto {
  sourceWallet: string;

  tokenTransfers: Record<string, any>;

  txType: string;

  txRef: string;

  timestamp: string;
}

interface RawTokenAmount {
  decimals: number;
  tokenAmount: string;
}

interface TokenBalanceChange {
  mint: string;
  rawTokenAmount: RawTokenAmount;
  tokenAccount: string;
  userAccount: string;
}

interface AccountData {
  account: string;
  nativeBalanceChange: number;
  tokenBalanceChanges: TokenBalanceChange[];
}

interface InnerInstruction {
  accounts: string[];
  data: string;
  programId: string;
}

interface Instruction {
  accounts: string[];
  data: string;
  innerInstructions: InnerInstruction[];
  programId: string;
}

interface NativeTransfer {
  amount: number;
  fromUserAccount: string;
  toUserAccount: string;
}

interface TokenTransfer {
  fromTokenAccount: string;
  fromUserAccount: string;
  mint: string;
  toTokenAccount: string;
  toUserAccount: string;
  tokenAmount: number;
  tokenStandard: string;
}

interface Transaction {
  accountData: AccountData[];
  description: string;
  events: Record<string, unknown>;
  fee: number;
  feePayer: string;
  instructions: Instruction[];
  nativeTransfers: NativeTransfer[];
  signature: string;
  slot: number;
  source: string;
  timestamp: number;
  tokenTransfers: TokenTransfer[];
  transactionError: any | null;
  type: string;
}

export class webHookData {
  trans: Transaction[];
}
