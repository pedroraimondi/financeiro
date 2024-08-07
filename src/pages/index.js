'use client'

import Accounts from "@/components/Accounts";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";
import useWindowSize from "@/utils/useWindowSize";
import Head from "next/head";
import { useState } from "react";

export default function Home() {

  const accounts = {
    0: {
      income: 3000,
      outcome: 2000,
      total: 1000,
      id: 0,
      variation: 'primary',
      color: '#00875F'
    },
    1: {
      income: 3500,
      outcome: 1000,
      total: 2500,
      id: 1,
      color: '#939300',
      variation: 'secondary',
    }
  }

  const [account, setAccount] = useState(accounts[0]);

  const { width } = useWindowSize();

  const handleAccounts = (targetAccount) => {
    setAccount(accounts[targetAccount]);
  }

  return (
    <>
      <Head>
        <title>Financeiro</title>
        <meta name="description" content="Aplicação para controle financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header account={account} handleAccounts={handleAccounts} />
        <Dashboard account={account} />
        <Accounts width={width} account={account} />
      </main>
    </>
  );
}
