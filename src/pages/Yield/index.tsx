import { useFuse, useSortableData } from 'hooks'
import React, { useState } from 'react'
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

import { LiquidityPosition, KashiLending } from './masterchefv1/Rows/Farms'
import useMasterChefFarms from './masterchefv1/hooks/useFarms'
//import useMasterChefV2Farms from './masterchefv2/hooks/useFarms'
//import useMiniChefFarms from './minichef/hooks/useFarms'

import Menu from './Menu'
import Loading from './Loading'

export const FixedHeightRow = styled(RowBetween)`
    height: 24px;
`

export default function Yield(): JSX.Element {
    const { i18n } = useLingui()
    const { chainId } = useActiveWeb3React()

    const [section, setSection] = useState<'portfolio' | 'all' | 'kmp' | 'slp' | 'mcv2'>('all')

    const masterchefv1 = useMasterChefFarms()
    //const masterchefv2 = useMasterChefV2Farms()
    //const minichef = useMiniChefFarms()

    console.log('masterchefv1:', masterchefv1)

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
            <div className="container mx-auto grid grid-cols-12 gap-4">
                <div className="sticky top-0 col-span-3 space-y-2 " style={{ maxHeight: '40rem' }}>
                    <Menu section={section} setSection={setSection} />
                </div>
                <div className="col-span-9">
                    <Card
                        className="h-full bg-dark-900"
                        header={
                            <CardHeader className="flex justify-between items-center bg-dark-800">
                                <div className="flex w-full justify-between">
                                    <div className="hidden md:flex items-center">
                                        <div className="text-lg mr-2 whitespace-nowrap">
                                            {i18n._(t`Yield Instruments`)}
                                        </div>
                                    </div>
                                    <Search search={search} term={term} />
                                </div>
                            </CardHeader>
                        }
                    >
                        {section && section === 'slp' && (
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
                                                <Dots>Fetching Instruments</Dots>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        {section && section === 'kmp' && (
                            <div className="flex-col space-y-2">
                                {items && items.length > 0 ? (
                                    items.map((farm: any, i: number) => {
                                        if (farm.type === 'KMP') {
                                            console.log('kmp farm:', farm)
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
                                                <Dots>Fetching Instruments</Dots>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        {section && section === 'all' && (
                            <div className="flex-col space-y-2">
                                {items && items.length > 0 ? (
                                    items.map((farm: any, i: number) => {
                                        console.log('farm:', farm)
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
                                                <Dots>Fetching Instruments</Dots>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    )
}
