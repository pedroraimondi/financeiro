'use client'

import styles from './Accounts.module.css'
import AccountOne from './components/AccountOne'
import AccountTwo from './components/AccountTwo'

export default function Accounts({ width, account }) {

  return (
    <div
      className={styles.accounts}
      // style={{ left: `-${width * account.id}px` }}
    >
      <AccountOne account={account} />
      {/* <AccountTwo account={account} /> */}
    </div>
  )
}
