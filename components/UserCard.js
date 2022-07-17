//card component start
import { Card } from 'antd';
import 'antd/dist/antd.css';
const { Meta } = Card;


import { Modal } from 'antd';
const info = (user) => {
  Modal.info({
    title: 'User detail',
    content: (
      <table >
        <tr>
          <td>Name </td>
          <td>{user.fullname}</td>
        </tr>
        <tr>
          <td>Gender </td>
          <td>{user.gender}</td>
        </tr>
        <tr>
          <td>Age </td>
          <td>{user.age}</td>
        </tr>
        <tr>
          <td>Birtdday </td>
          <td>{user.dob}</td>
        </tr>
        <tr>
          <td>Address </td>
          <td>{user.address}</td>
        </tr>
        <tr>
          <td>Nationality </td>
          <td>{user.nat}</td>
        </tr>
      </table>
    ),
    onOk() {},
    maskClosable: true
  });
};
//card component end

export default function UserCard({ user }){
  return (
    <Card
        onClick={(e)=>{
          e.preventDefault()
          info({
            fullname: `${user.name.first} ${user.name.last}`,
            gender: user.gender,
            age: user.dob.age,
            dob: new Date(user.dob.date).toLocaleDateString(),
            address: `${user.location.street.number} ${user.location.street.name}, ${user.location.postcode}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
            nat: user.nat
          })
        }}
        hoverable={true}
        style={{ width: 240 }}
        cover={<img alt="example" src={user.picture.large} width={200} height={200} />}
      >
        <Meta title={`${user.name.title === 'Miss' ? user.name.title : user.name.title+'.'} ${user.name.first} ${user.name.last} (${new Date().getFullYear() - new Date(user.dob.date).getFullYear()})`} />
        
        <div>
          <h5>{user.email}</h5>
        </div>
        <div>{new Date(user.dob.date).toLocaleDateString()}</div>
        <div>{user.location.city}</div>
    </Card>
  )
}