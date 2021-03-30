import React from 'react'
import { Search } from '../components'

import { ChainId, Currency } from '@sushiswap/sdk'
import { Text } from 'rebass'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import { useActiveWeb3React } from 'hooks'
import { useDarkModeManager } from 'state/user/hooks'
import { useETHBalances } from 'state/wallet/hooks'

import { YellowCard } from 'components/Card'
import { Moon, Sun } from 'react-feather'
import Menu from 'components/Menu'

import Web3Status from 'components/Web3Status'
import LanguageSwitch from 'components/LanguageSwitch'
import { StyledMenuButton } from 'components/StyledMenu'

const ExtendedStyledMenuButton = styled(StyledMenuButton)`
  margin-left: 8px;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;

    & > *:not(:first-child) {
      margin-left: 4px;
    }
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: ${({ theme }) => theme.borderRadius};
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px 12px;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Matic',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.XDAI]: 'xDai',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBASE]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet'
}

const Header = () => {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()
  const [darkMode, toggleDarkMode] = useDarkModeManager()

  return (
    <>
      <header className="w-full">
        <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
          <button className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
            <span className="sr-only">Open sidebar</span>
            {/* Heroicon name: outline/menu-alt-2 */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6">
            <Search />
            <div className="ml-2 flex items-center">
              <HeaderElement>
                <HideSmall>
                  {chainId && NETWORK_LABELS[chainId] && (
                    <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
                  )}
                </HideSmall>
                <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                  {account && chainId && userEthBalance ? (
                    <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                      {userEthBalance?.toSignificant(4)} {Currency.getNativeCurrencySymbol(chainId)}
                    </BalanceText>
                  ) : null}
                  <Web3Status />
                </AccountElement>
              </HeaderElement>
              <HeaderElementWrap>
                <ExtendedStyledMenuButton onClick={() => toggleDarkMode()}>
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </ExtendedStyledMenuButton>
                <LanguageSwitch />
                <Menu />
              </HeaderElementWrap>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
