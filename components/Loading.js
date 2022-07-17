import { Spin } from 'antd';
import styles from '../styles/Loading.module.css'

export default function Loading(){
  return (
    <div className={styles.container}>
      <Spin />
    </div>
  )
}