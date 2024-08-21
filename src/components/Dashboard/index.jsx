'use client'

import { priceFormatter } from '@/utils/formatter';
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import styles from './Dashboard.module.css';

export default function Dashboard({ account, transactions }) {
  const dashboards = [
    {
      label: 'Entradas',
      valueType: 'income',
      icon: ArrowCircleUp,
      color: account.color
    },
    {
      label: 'Saídas',
      valueType: 'outcome',
      icon: ArrowCircleDown,
      color: '#F75A68'
    },
    {
      label: 'Total',
      valueType: 'total',
      icon: CurrencyDollar,
      color: '#fff'
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      {dashboards.map(dashboard => (
        <div key={dashboard.valueType} style={dashboard.valueType == 'total' ? { backgroundColor: account.color } : {}} className={styles.dashboardCard}>
          <header>
            <span>{dashboard.label}</span>
            <dashboard.icon size={32} color={dashboard.color} />
          </header>

          <strong>{priceFormatter(transactions[dashboard.valueType])}</strong>
        </div>
      ))}
    </div>
  )
}
