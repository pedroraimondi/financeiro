import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import Transactions from "@/components/Transactions";
import styles from "@/styles/Home.module.css";
import useWindowSize from "@/utils/useWindowSize";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import connectToDatabase from "../../middleware/mongodb";
import Account from "../../models/account";

export default function Home({ accounts: accountsString }) {
  const accounts = accountsString ? JSON.parse(accountsString) : [];

  const [transactions, setTransactions] = useState({ transactions: [], income: 0, outcome: 0, total: 0 });
  const [account, setAccount] = useState(accounts[0] || {});

  console.log(transactions)

  useEffect(() => {
    axios.get('/api/transaction', { params: { account: account._id } })
      .then((response) => {
        setTransactions(response.data);
      });
  }, [account])

  const { width } = useWindowSize();

  const handleAccounts = (targetAccount) => {
    setAccount(targetAccount);
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
        <Header account={account} transactions={transactions} accounts={accounts} handleAccounts={handleAccounts} />
        <Dashboard transactions={transactions} account={account} />

        <Transactions transactions={transactions.transactions} width={width} account={account} />
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await connectToDatabase();

  const accountsArray = await Account.find({});
  const accounts = accountsArray?.length ? JSON.stringify(accountsArray) : '[]';

  return { props: { accounts } }

}
