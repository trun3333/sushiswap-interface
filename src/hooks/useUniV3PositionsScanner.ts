import { ethers } from 'ethers'
import React, { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useUniV3PositionContract } from '../hooks/useContract'

import { Position } from '@uniswap/v3-sdk'

const { BigNumber } = ethers

const useUniV3PositionsScanner = () => {
    const [results, setResults] = useState<any | undefined>()
    const { account, chainId } = useActiveWeb3React()
    const positionContract = useUniV3PositionContract(true) // withSigner

    const fetchAllFarms = useCallback(async () => {
        // const results = await Promise.all([
        //     fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20', { method: 'GET' })
        //         .then(response => response.json())
        //         .then(response => console.log(response))
        //         .catch(err => console.error(err))
        // ])

        const opensea = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err))

        console.log('opensea:', opensea)
        // find ID from opensea description and pass ID to univ3Positions
        const id = '123' // example

        const findPosition = await positionContract?.positions(id)
        console.log('position:', findPosition)
    }, [positionContract])

    useEffect(() => {
        fetchAllFarms()
    }, [fetchAllFarms])

    return results
}

export default useUniV3PositionsScanner
