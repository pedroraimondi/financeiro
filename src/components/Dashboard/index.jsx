import { priceFormatter } from '@/utils/formatter';
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import styles from './Dashboard.module.css';

export default function Dashboard({ account }) {
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
        <div key={dashboard.valueType} className={`${styles.dashboardCard} ${dashboard.valueType == 'total' && styles[account.variation]}`}>
          <header>
            <span>{dashboard.label}</span>
            <dashboard.icon size={32} color={dashboard.color} />
          </header>

          <strong>{priceFormatter.format(account[dashboard.valueType])}</strong>
        </div>
      ))}
    </div>
  )
}
