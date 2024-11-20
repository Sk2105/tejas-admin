import { useState } from "react"
import db from "../db/db_connection"

function UploadBox() {

    // eslint-disable-next-line no-unused-vars
    const [currentDate, setCurrentDate] = useState(new Date())
    // eslint-disable-next-line no-unused-vars
    const [currentTime, setCurrentTime] = useState(new Date())
    // eslint-disable-next-line no-unused-vars
    const [number, setNumber] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [upload, setUpload] = useState(false)


    // eslint-disable-next-line no-unused-vars
    const handleUpload = async (date, time, number) => {
        const result = async () => {
            await db.sql`
        INSERT INTO t_coupon(date, time, result) VALUES (${date}, ${time}, ${number});`
        }

        result().then(() => {
            setUpload(true)
        }).catch((error) => {
            console.log(error)
        })

    }



    const handleChange = (e) => {
        setCurrentTime(e.target.value);
        console.log("Selected time:", e.target.value);
    };
    return (

        <div className="w-full m-4 p-2 flex justify-center items-center flex-col rounded-2xl bg-white">

            <h1 className="w-[90%] text-xl font-bold text-start">Date</h1>
            <input type="date" name="date" id="" onChange={
                (e) => {
                    // eslint-disable-next-line no-unused-vars
                    const date = new Date(e.target.value)
                    setCurrentDate(date)
                }
            } value={`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`} className="m-2 w-[90%] border border-black rounded-xl p-2" />



            <h1 className="w-[90%] text-xl font-bold text-start">Time</h1>
            <input
                type="time"
                id="time"
                value={currentTime}
                onChange={handleChange}
                className="m-2 w-[90%] border border-black rounded-xl p-2"
            />

            <h1 className="w-[90%] text-xl font-bold text-start">Number</h1>
            <input type="number" value={number} onChange={
                (e) => {
                    setNumber(e.target.value)
                }
            } name="number" id="" className="m-2 w-[90%] border border-black rounded-xl p-2" />

            <button onClick={() => {
                console.log(currentDate, currentTime, number);
                const date = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`

                handleUpload(date, currentTime, number)

            }} className="m-2 w-[90%] border bg-[#45a049] rounded-xl p-2">Submit</button>

            {
                upload && (
                    <h1 className="w-[90%] p-2 rounded-xl m-2 text-xl font-bold text-center bg-[#45a04930] text-[#45a049]">Successfully Upload</h1>
                )
            }
        </div>

    )
}

export default UploadBox