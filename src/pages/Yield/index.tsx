import { useFuse, useSortableData } from 'hooks'
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import styled from 'styled-components'
import { RowBetween } from '../../components/Row'
import { formattedNum, formattedPercent } from '../../utils'
import { Card, CardHeader, Search } from './components'
import { SimpleDots as Dots } from 'kashi/components'
import { Helmet } from 'react-helmet'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { ChainId } from '@sushiswap/sdk'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'

import useStakedPending from './portfolio/hooks/useStakedPending'
import { Header, LiquidityPosition, KashiLending } from './masterchefv1/Rows/Farms'
import useMasterChefFarms from './masterchefv1/hooks/useFarms'
import useMiniChefFarms from './minichef/hooks/useFarms'
import { useMasterChefContract, useMiniChefV2Contract } from '../../hooks/useContract'
//import useMasterChefV2Farms from './masterchefv2/hooks/useFarms'
//import useMiniChefFarms from './minichef/hooks/useFarms'

import _ from 'lodash'
import Menu from './Menu'

export const FixedHeightRow = styled(RowBetween)`
    height: 24px;
`

export default function Yield(): JSX.Element {
    const { i18n } = useLingui()

    const [section, setSection] = useState<'portfolio' | 'all' | 'kmp' | 'slp' | 'mcv2'>('all')

    // Get Farms
    const masterchefv1 = useMasterChefFarms()
    const minichef = useMiniChefFarms()

    // Get Contracts
    const masterchefContract = useMasterChefContract()
    const minichefContract = useMiniChefV2Contract()

    // Get Portfolios
    const masterchefv1Positions = useStakedPending(masterchefContract)
    const minichefPositions = useStakedPending(minichefContract)

    useEffect(() => {
        // determine masterchefv1 positions
        const masterchefv1WithPids = masterchefv1Positions?.[0].map((position, index) => {
            return {
                pid: index,
                pending: position?.result?.[0],
                staked: masterchefv1Positions?.[1][index].result?.amount
            }
        })
        const masterchefv1Filtered = masterchefv1WithPids.filter((position: any) => {
            return position?.pending?.gt(0) || position?.staked?.gt(0)
        })

        // determine minichef positions
        const minichefWithPids = minichefPositions?.[0].map((position, index) => {
            return {
                pid: index,
                pending: position?.result?.[0],
                staked: minichefPositions?.[1][index].result?.amount
            }
        })
        const minichefFiltered = minichefWithPids.filter((position: any) => {
            return position?.pending?.gt(0) || position?.staked?.gt(0)
        })

        console.log('results:', { masterchefv1Filtered: masterchefv1Filtered, minichefFiltered: minichefFiltered })

        // const masterchefv1Filtered = _.filter(masterchefv1Positions?.[0], function(position) {
        //     console.log('position:', position, position.result?.[0].gt(0))
        // })
    }, [masterchefv1Positions, minichefPositions])

    // 1. Add Portfolios
    // 2. Add MCV2 Hooks
    // 3. Add Alchemix Banner
    // 4. Fix mobile grid spanning
    // 5. Make SUSHI/day text

    // const masterchefv1Filtered = _.filter(masterchefv1Positions?.[0], function(position) {
    //     console.log('position:', position, position.result?.[0].gt(0))
    //     //return position?.result?.gt(0)
    // })

    // MasterChef v2

    const farms = masterchefv1

    //Search Setup
    const options = { keys: ['symbol', 'name', 'pairAddress'], threshold: 0.4 }
    const { result, search, term } = useFuse({
        data: farms && farms.length > 0 ? farms : [],
        options
    })
    const flattenSearchResults = result.map((a: { item: any }) => (a.item ? a.item : a))

    // Sorting Setup
    const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults)

    return (
        <>
            <Helmet>
                <title>{i18n._(t`Yield`)} | Sushi</title>
                <meta name="description" content="Farm SUSHI by staking LP (Liquidity Provider) tokens" />
            </Helmet>
            <div className="container mx-auto grid grid-cols-4 gap-4">
                <div className="hidden lg:block sticky top-0 md:col-span-1" style={{ maxHeight: '40rem' }}>
                    <Menu section={section} setSection={setSection} />
                </div>
                <div className="col-span-4 lg:col-span-3">
                    <Card
                        className="h-full bg-dark-900"
                        header={
                            <CardHeader className="flex flex-col items-center bg-dark-800">
                                <div className="flex w-full justify-between">
                                    <div className="hidden md:flex items-center">
                                        <div className="text-lg mr-2 whitespace-nowrap">{i18n._(t`Yield Farms`)}</div>
                                    </div>
                                    <Search search={search} term={term} />
                                </div>
                                <div className="block lg:hidden pt-6 container">
                                    <Menu section={section} setSection={setSection} />
                                </div>
                            </CardHeader>
                        }
                    >
                        {section && section === 'portfolio' && (
                            <>
                                <Header sortConfig={sortConfig} requestSort={requestSort} />
                                <div className="flex-col space-y-2">
                                    {items && items.length > 0 ? (
                                        items.map((farm: any, i: number) => {
                                            if (farm.type === 'SLP') {
                                                return <LiquidityPosition key={farm.address + '_' + i} farm={farm} />
                                            } else {
                                                return null
                                            }
                                        })
                                    ) : (
                                        <>
                                            {term ? (
                                                <div className="w-full text-center py-6">No Results.</div>
                                            ) : (
                                                <div className="w-full text-center py-6">
                                                    <Dots>Fetching Farms</Dots>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {section && section === 'slp' && (
                            <>
                                <Header sortConfig={sortConfig} requestSort={requestSort} />
                                <div className="flex-col space-y-2">
                                    {items && items.length > 0 ? (
                                        items.map((farm: any, i: number) => {
                                            if (farm.type === 'SLP') {
                                                return <LiquidityPosition key={farm.address + '_' + i} farm={farm} />
                                            } else {
                                                return null
                                            }
                                        })
                                    ) : (
                                        <>
                                            {term ? (
                                                <div className="w-full text-center py-6">No Results.</div>
                                            ) : (
                                                <div className="w-full text-center py-6">
                                                    <Dots>Fetching Farms</Dots>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {section && section === 'kmp' && (
                            <>
                                <Header sortConfig={sortConfig} requestSort={requestSort} />
                                <div className="flex-col space-y-2">
                                    {items && items.length > 0 ? (
                                        items.map((farm: any, i: number) => {
                                            if (farm.type === 'KMP') {
                                                return <KashiLending key={farm.address + '_' + i} farm={farm} />
                                            } else {
                                                return null
                                            }
                                        })
                                    ) : (
                                        <>
                                            {term ? (
                                                <div className="w-full text-center py-6">No Results.</div>
                                            ) : (
                                                <div className="w-full text-center py-6">
                                                    <Dots>Fetching Farms</Dots>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {section && section === 'all' && (
                            <>
                                <Header sortConfig={sortConfig} requestSort={requestSort} />
                                <div className="flex-col space-y-2">
                                    {items && items.length > 0 ? (
                                        items.map((farm: any, i: number) => {
                                            if (farm.type === 'KMP') {
                                                return <KashiLending key={farm.address + '_' + i} farm={farm} />
                                            } else if (farm.type === 'SLP') {
                                                return <LiquidityPosition key={farm.address + '_' + i} farm={farm} />
                                            } else {
                                                return null
                                            }
                                        })
                                    ) : (
                                        <>
                                            {term ? (
                                                <div className="w-full text-center py-6">No Results.</div>
                                            ) : (
                                                <div className="w-full text-center py-6">
                                                    <Dots>Fetching Farms</Dots>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </>
    )
}
