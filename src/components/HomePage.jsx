

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import db from '../db/db_connection'
import CouponView from './coupon_view'

export default function HomePage() {

    // eslint-disable-next-line no-unused-vars
    const [list, setList] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [currentDate, setCurrentDate] = useState(new Date())


    // eslint-disable-next-line no-unused-vars
    const fetch = async () => {
        const result = async () => await db.sql`use TajasCoupon; select * from t_coupon where date = ${`currentDate.getDay():${currentDate.getMonth()}:${currentDate.getFullYear()}}`};`;
        result().then((res) => {
            setList(res)
            console.log(res);

        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='w-full'>

            <CouponView />

        </div>
    )
}
