
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import db from "../db/db_connection";

// eslint-disable-next-line no-unused-vars
function ShowAddDialog({ onClose, onSuccess, id }) {

    return (
        <div className="fixed top-0 h-full w-full bg-black bg-opacity-70 flex items-center justify-center ">
            <div className="bg-white p-4 w-[90%] md:w-[500px] border shadow-xl shadow-gray-500 border-[#121b99] rounded-2xl items-start">
                <h1 className="text-2xl p-2 text-center border-b-2 border-[#45a049] font-bold text-[#121b99]">{id == null ? "Add New Result" : "Update Result"}</h1>
                <UploadBox onClose={onClose} onSuccess={onSuccess} id={id} />
            </div>

        </div>
    );
}

function UploadBox({ onClose, onSuccess, id }) {

    // eslint-disable-next-line no-unused-vars
    const [currentDate, setCurrentDate] = useState(new Date())
    // eslint-disable-next-line no-unused-vars
    const [currentTime, setCurrentTime] = useState(`${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`)
    // eslint-disable-next-line no-unused-vars
    const [number, setNumber] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [isUpdate, setIsUpdate] = useState(false)

    const [error, setError] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")


    const fetchDataById = async () => {
        console.log(id);

        if (id != null) {
            console.log("id is not null");

            const result = async () => await db.sql`select * from t_coupon where id = ${id}`;
            result().then((res) => {
                console.log(res);
                const date = new Date(reverseDate(res[0].date))
                const hours = res[0].time.toString().split(':')[0].toString().padStart(2, '0')
                const minutes = res[0].time.toString().split(':')[1].toString().padStart(2, '0')
                console.log(hours, minutes);

                setCurrentDate(date)
                setCurrentTime(`${hours}:${minutes}`)

                console.log(currentTime);
                setIsUpdate(true)



                setNumber(res[0].result)
            }).catch((error) => {
                setError(true)
                setErrorMessage(error)

                console.log(error)
            })
        }


    }

    useEffect(() => {
        fetchDataById()
    }, [id])


    // eslint-disable-next-line no-unused-vars
    const handleUpload = async (date, time, number) => {
        if (id == null) {
            const result = async () => {
                await db.sql`
            INSERT INTO t_coupon(date, time, result) VALUES (${date}, ${time}, ${number});`
            }

            result().then(() => {
                onSuccess()
            }).catch((error) => {
                setError(true)
                setErrorMessage(error)
                console.log(error)
            })
        } else {
            const result = async () => {
                await db.sql`
            UPDATE t_coupon SET date = ${date}, time = ${time}, result = ${number} WHERE id = ${id};`
            }

            result().then(() => {
                onSuccess()
            }).catch((error) => {
                setError(true)
                setErrorMessage(error)
                console.log(error)
            })
        }


    }



    const handleChange = (e) => {
        setCurrentTime(e.target.value);
        console.log("Selected time:", e.target.value);
    };
    return (

        <div className="w-full m-4 p-2 flex justify-center items-center flex-col rounded-2xl bg-white">

            <h1 className="w-[90%] text-[16px] font-bold text-start">Date</h1>
            <input type="date" name="date" id="" onChange={
                (e) => {
                    // eslint-disable-next-line no-unused-vars
                    const date = new Date(e.target.value)
                    setCurrentDate(date)
                }
            } value={`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`}
                className={`m-2 w-[90%] border border-black rounded-[10px]   p-2 `} readOnly={isUpdate} />



            <h1 className="w-[90%] text-[16px] font-bold text-start">Time</h1>
            <input
                type="time"
                id="time"
                value={currentTime}
                onChange={handleChange}
                className="m-2 w-[90%] border  border-black rounded-[10px] p-2"
                readOnly={isUpdate}
            />

            <h1 className="w-[90%] text-[16px] font-bold text-start">Number</h1>
            <input type="text" value={number} onChange={
                (e) => {
                    setNumber(e.target.value)
                }
            } name="number" id="" className="m-2 w-[90%] border border-black rounded-[10px] p-2" />

            <div className=" w-[90%] flex justify-end">
                <button onClick={() => onClose()} className="m-2 w-[100px] hover:bg-red-600 hover:text-white border border-red-600 text-red-600 rounded-md p-2">Close</button>
                <button onClick={() => {
                    console.log(currentDate, currentTime, number);
                    const date = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`
                    handleUpload(date, currentTime, number)

                }} className="m-2  border bg-[#45a049] w-[100px] hover:bg-green-950 text-white rounded-md p-2">Submit</button>

            </div>

            {
                error && (
                    <h1 className="w-[90%] p-2 rounded-xl m-2 text-xl font-bold text-center bg-red-600 text-white">{errorMessage}</h1>
                )
            }
        </div>

    )
}

// eslint-disable-next-line no-unused-vars
function reverseDate(date) {
    const parts = date.split('-');
    return `${parts[2]}/${parts[1].toString().padStart(2, '0')}/${parts[0].toString().padStart(2, '0')}`;
}



export default ShowAddDialog