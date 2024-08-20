'use client'

import { priceFormatter } from '@/utils/formatter';
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import styles from './Dashboard.module.css';
import { TuiDateRangePicker } from 'nextjs-tui-date-range-picker';

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

  const options = {
    language: 'en',
    format: 'dd-MM-YYYY',
  };

  return (
    <div className={styles.dashboardContainer}>
      {dashboards.map(dashboard => (
        <div key={dashboard.valueType} className={`${styles.dashboardCard} ${dashboard.valueType == 'total' && styles[account.variation]}`}>
          <header>
            <span>{dashboard.label}</span>
            <dashboard.icon size={32} color={dashboard.color} />
          </header>

          <strong>{priceFormatter(transactions[dashboard.valueType])}</strong>
        </div>
      ))}
      <div className={styles.filters}>
        <TuiDateRangePicker
          handleChange={(e) => console.log(e)}
          options={options}
          inputWidth={80}
          containerWidth={200}
          startpickerDate={new Date('2023-01-02')}
          endpickerDate={new Date('2023-01-30')}
        />
      </div>
    </div>
  )
}
