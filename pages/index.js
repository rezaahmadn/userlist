import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UserCard from '../components/UserCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Space, Button } from 'antd';

export default function Home() {
  const [ users, setUsers ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ nat, setNat ] = useState(null)
  const [ menu, setMenu ] = useState(null)

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?seed=abc&page=${page || 1}&results=10&nat=${nat || ''}`)
    .then(res => {
      const { data } = res
      setUsers(data.results)
    })
    .catch(error => console.log(error))
  }, [nat, page])

  useEffect(() => {
    const nationality = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US']
    const menus = (
      <Menu
        items={
          nationality.map((n, i) => {
            return {
              key:`${i}${n}`,
              label: (
                <div onClick={() => {setNat(n); setPage(1)}}>
                  {`${n}`}
                </div>
              )
            }
          })
        }
      />
    );
    setMenu(menus)
  }, [])

  if(!users.length){
    return (
      <Loading />
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>User List</title>
        <meta name="description" content="User list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h3 onClick={() => {setNat(null); setPage(1)}} className={styles.title}>
          User List
        </h3>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              Nationality
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className={styles.main}>
        {users.map(user => <UserCard key={user.id.value} user={user} />)}
      </div>
      <div className={styles.footer}>
        <Button type="primary" onClick={()=>{setPage(page - 1)}} disabled={page <= 1}>
          Previous
        </Button>
        <div>
          {page}
        </div>
        <Button type="primary" onClick={()=>{setPage(page+1)}}>
          Next
        </Button>
      </div>
    </div>
  )
}
