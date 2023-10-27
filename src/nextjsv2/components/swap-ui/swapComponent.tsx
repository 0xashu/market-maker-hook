import React, { useEffect, useState } from "react";
import convertSqrtPriceX96ToPrice from "./helpers/utils";
import { Switch, Tab, Tabs } from "@nextui-org/react";
import {
  useErc20Decimals,
  useErc20Name,
  useErc20Symbol,
  useMockErc20Name,
  useMockErc20Symbol,
  usePoolManagerGetLiquidity,
  usePoolManagerPools,
} from "~~/generated/generated-old";

function SwapComponent({ poolKey }: { poolKey: any }) {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [liquidityAvailable, setLiquidityAvailable] = useState("1000 ETH");
  const [fee, setFee] = useState("0.3%");
  const [slippage, setSlippage] = useState("0.2%");

  const {
    data: poolLiquidity,
    isLoading: isLoadingLiq,
    isError: isErrorLiq,
  } = usePoolManagerGetLiquidity({
    address: "0x565506C573abFE24Eb6abb7c0D8C809aCe1f638D",
    args: ["0xadd0d7bffbfdc526544c1cf8f069a0ffc255b570212d7139c2ba11cac3f1b644"],
  });

  const {
    data: poolData,
    isLoading: isLoadingPool,
    isError: isErrorPool,
  } = usePoolManagerPools({
    address: "0x565506C573abFE24Eb6abb7c0D8C809aCe1f638D",
    args: ["0xadd0d7bffbfdc526544c1cf8f069a0ffc255b570212d7139c2ba11cac3f1b644"],
  });

  const {
    data: Token0Data,
    isLoading: isLoadingToken0,
    isError: isErrorToken0,
  } = useErc20Name({
    address: "0x2dafbdf11a8cf84c372539a38d781d8248399ae3",
  });

  const {
    data: Token1Data,
    isLoading: isLoadingToken1,
    isError: isErrorToken1,
  } = useErc20Name({
    address: "0xa8ceafb1940244f2f022ff8440a42411b4f07fc4",
  });

  // update fromCurrency and toCurrency

  useEffect(() => {
    if (!isLoadingToken0 && !isErrorToken0) {
      setFromCurrency(Token0Data!);
    }
    if (!isLoadingToken1 && !isErrorToken1) {
      setToCurrency(Token1Data!);
    }
  }, [Token0Data && Token1Data]);

  console.log(Token0Data, "Token0Data", isLoadingToken0, isErrorToken0);
  console.log(Token1Data, "Token0Data1", isLoadingToken1, isErrorToken1);
  console.log(poolLiquidity, "poolManagerPools2", isLoadingLiq, isErrorLiq);

  console.log(poolData, "poolManagerPools", isLoadingPool, isErrorPool);

  const handleSwap = () => {
    // Implement swap logic here
  };

  const handleAddLiquidity = () => {
    // Implement add liquidity logic here
  };

  const handleRemoveLiquidity = () => {
    // Implement remove liquidity logic here
  };

  return (
    <div className="card shadow-2xl p-6 bg-white rounded-xl border-2 border-pink-400 min-w-[34rem] max-w-xl transition-shadow hover:shadow-none">
      <div className="space-y-6">
        <Tabs key={"pink"} color={"danger"} aria-label="Tabs" radius="full">
          <Tab key="swap" title="Swap" />
          <Tab key="liquidity" title="Liquidity" />
        </Tabs>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-end">
            <label className="label text-left block">
              <span className="label-text">From:</span>
            </label>
            <select
              className="select select-bordered w-full mt-2"
              value={fromCurrency}
              onChange={e => setFromCurrency(e.target.value)}
            >
              <option>{fromCurrency}</option>
              <option>{toCurrency}</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <input
              type="number"
              className="input input-bordered w-full mt-6"
              placeholder="Amount"
              value={fromAmount}
              onChange={e => setFromAmount(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-end">
            <label className="label text-left block">
              <span className="label-text">To:</span>
            </label>
            <select
              className="select select-bordered w-full mt-2"
              value={toCurrency}
              onChange={e => setToCurrency(e.target.value)}
            >
              <option>{toCurrency}</option>
              <option>{fromCurrency}</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <input
              type="number"
              className="input input-bordered w-full mt-6"
              placeholder="Amount"
              value={toAmount}
              disabled
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-full hover:bg-indigo-600 hover:shadow-lg active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all mt-4"
          onClick={handleSwap}
        >
          Swap
        </button>

        <div className="border-t-2 border-gray-200 pt-4 mt-4">
          <div className="grid grid-rows-3 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span>Price:</span>
              <span className="font-bold ml-2">
                {" "}
                {/* {!isLoadingPool && !isErrorPool ? poolData[0].sqrtPriceX96.toString() : "NaN"} */}
                {!isLoadingPool && !isErrorPool ? convertSqrtPriceX96ToPrice(poolData[0].sqrtPriceX96) : "10"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Liquidity:</span>
              <span className="font-bold ml-2">{!isLoadingLiq && !isErrorLiq ? poolLiquidity?.toString() : "NaN"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Fee:</span>
              <span className="font-bold ml-2">
                {!isLoadingPool && !isErrorPool ? poolData[0].protocolFees : "NaN"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            className="btn btn-outline w-1/2 hover:bg-indigo-100 hover:shadow-md transition-all"
            onClick={handleAddLiquidity}
          >
            Add Liquidity
          </button>
          <button
            className="btn btn-outline w-1/2 hover:bg-indigo-100 hover:shadow-md transition-all"
            onClick={handleRemoveLiquidity}
          >
            Remove Liquidity
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapComponent;
