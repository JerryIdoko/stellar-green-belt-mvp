import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || Buffer;
}

export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || "CCLJ4FEXKXEZKS6UCROBEKLIVDOPFVP6Z75QS3AV5CUS2WAM3EBQNL7W",
  }
} as const;

export interface Client {
  fund: ({donor, amount}: {donor: string, amount: u32}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>
  claim: ({caller}: {caller: string}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>
  get_status: (options?: MethodOptions) => Promise<AssembledTransaction<Array<u64>>>
  initialize: ({target, deadline}: {target: u32, deadline: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>
}

export class Client extends ContractClient {
  static async deploy<T = Client>(
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        wasmHash: Buffer | string;
        salt?: Buffer | Uint8Array;
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABQAAAAAAAAAAAAAACUZ1bmRFdmVudAAAAAAAAAEAAAAKZnVuZF9ldmVudAAAAAAABAAAAAAAAAAFZG9ub3IAAAAAAAATAAAAAAAAAAAAAAAGYW1vdW50AAAAAAAEAAAAAAAAAAAAAAAMdG90YWxfcmFpc2VkAAAABAAAAAAAAAAAAAAABnRhcmdldAAAAAAABAAAAAAAAAAC",
        "AAAABQAAAAAAAAAAAAAACkNsYWltRXZlbnQAAAAAAAEAAAALY2xhaW1fZXZlbnQAAAAAAwAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAAAAAAMdG90YWxfcmFpc2VkAAAABAAAAAAAAAAAAAAABnRhcmdldAAAAAAABAAAAAAAAAAC",
        "AAAAAAAAAAAAAAAEZnVuZAAAAAIAAAAAAAAABWRvbm9yAAAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAEAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAFY2xhaW0AAAAAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAABAAAABA==",
        "AAAAAAAAAAAAAAAKZ2V0X3N0YXR1cwAAAAAAAAAAAAEAAAPqAAAABg==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAGdGFyZ2V0AAAAAAAEAAAAAAAAAAhkZWFkbGluZQAAAAYAAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    fund: this.txFromJSON<u32>,
        claim: this.txFromJSON<u32>,
        get_status: this.txFromJSON<Array<u64>>,
        initialize: this.txFromJSON<null>
  }
}
