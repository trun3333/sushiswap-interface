import React, { useState } from 'react'
import { formattedNum, formattedPercent } from '../../../../utils'
import { DoubleLogo, Paper } from '../../components'
import { MasterChefV1Details, MasterChefV2Details, MiniChefDetails } from '../Details'

const LiquidityPosition = ({ farm }: any) => {
    const [expand, setExpand] = useState<boolean>(false)
    return (
        <>
            {farm.type === 'SLP' && (
                <Paper className="bg-dark-800">
                    <div
                        className="bg-dark-850 grid grid-cols-3 md:grid-cols-4 px-4 py-2  cursor-pointer select-none rounded rounded-b-none"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="text-sm sm:text-base font-semibold">
                            {farm && farm.liquidityPair.token0.symbol + '-' + farm.liquidityPair.token1.symbol}
                        </div>
                        <div className="hidden md:block text-sm sm:text-base ml-4 text-gray-500 text-right">
                            {'SUSHI'}
                        </div>
                        <div className="text-gray-500 text-sm sm:text-base text-right">
                            {formattedNum(farm.tvl, true)}
                        </div>
                        <div className="font-semibold text-sm sm:text-base text-right">
                            {farm.roiPerYear > 100 ? '10000%+' : formattedPercent(farm.roiPerYear * 100)}
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-3 md:grid-cols-4 py-4 px-4 cursor-pointer select-none rounded text-sm"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="col-span-1 flex items-center">
                            <div className="mr-4">
                                <DoubleLogo
                                    a0={farm.liquidityPair.token0.id}
                                    a1={farm.liquidityPair.token1.id}
                                    size={40}
                                    margin={true}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1 hidden md:flex flex-row space-x-2 justify-end items-center ml-4">
                            <div>
                                <div className="text-gray-500 text-right font-semibold text-sm sm:text-sm">
                                    {formattedNum(farm.sushiRewardPerDay)} SUSHI
                                </div>
                                <div className="text-gray-500 text-right text-xs">per day</div>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex justify-end items-center">
                            <div>
                                {/* <div className="text-right">{formattedNum(farm.tvl, true)} </div> */}
                                <div className="text-gray-500 text-right font-semibold text-sm sm:text-sm">
                                    {formattedNum(farm.slpBalance / 1e18, false)} SLP
                                </div>
                                <div className="text-gray-500 text-right text-xs">Market Staked</div>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex justify-end items-center">
                            <div>
                                <div className="text-gray-500 text-right font-semibold text-base sm:text-lg">
                                    {farm.roiPerYear > 100 ? '10000%+' : formattedPercent(farm.roiPerYear * 100)}
                                    {/* {formattedPercent(farm.roiPerMonth * 100)}{' '} */}
                                </div>
                                <div className="text-gray-500 text-right text-xs">annualized</div>
                                {/* <div className="text-gray-500 text-right text-xs">per month</div> */}
                            </div>
                        </div>
                    </div>

                    {expand && farm.contract === 'masterchefv1' && (
                        <MasterChefV1Details
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.token0.id}
                            token1Address={farm.liquidityPair.token1.id}
                            type={'LP'}
                        />
                    )}
                    {expand && farm.contract === 'masterchefv2' && (
                        <MasterChefV2Details
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.token0.id}
                            token1Address={farm.liquidityPair.token1.id}
                            type={'SLP'}
                        />
                    )}
                    {expand && farm.contract === 'minichef' && (
                        <MiniChefDetails
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.token0.id}
                            token1Address={farm.liquidityPair.token1.id}
                            type={'SLP'}
                        />
                    )}
                </Paper>
            )}
        </>
    )
}

export default LiquidityPosition
