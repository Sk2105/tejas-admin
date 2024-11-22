
import db from "../db/db_connection";
import { useState } from "react";
import { useEffect } from "react";

export default function CouponView() {

    // eslint-disable-next-line no-unused-vars
    const [editId, setEditId] = useState(null);
    const [addResultDialog, setAddResultDialog] = useState(false);

    const [currentDate, setCurrentDate] = useState(new Date());
    // eslint-disable-next-line no-unused-vars
    const [currentFormattedDate, setFormattedCurrentDate] = useState(`${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`);
    console.log(currentDate);

    const [list, setList] = useState([]);
    useEffect(() => {
        fetchData();
    }, [currentDate]);

    const fetchData = async () => {
        setList([]);

        const result = async () =>
            await db.sql(`use database TajasCoupon; SELECT * FROM t_coupon WHERE date = '${`${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`}' `);

        await result().then((data) => {
            setList(data);
        });
    }

    const showEditDialog = (id) => {
        setEditId(id);
        setAddResultDialog(true);
    }


    const onSuccess = () => {
        fetchData();
        setAddResultDialog(false);
        setEditId(null);
    }


    const onDelete = async (id) => {
        const result = async () => await db.sql(`DELETE FROM t_coupon WHERE id = ${id}`);
        await result().then(() => {
            fetchData();
        }).catch((error) => {
            console.log(error);
        })
    }


    return (

        <div className="w-full flex flex-col items-center justify-center" >
            <div className="w-full pt-5 flex flex-col item-center justify-center p-2">
                <div className="flex flex-col sm:flex-row m-5 justify-center gap-4 items-center">
                    <p className="text-sm text-[#45a049">Date</p>

                    <input type="date" className="bg-[#45a049] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" value={
                        `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toString().padStart(2, '0')}`
                    } onChange={(e) => {
                        setCurrentDate(new Date(e.target.value));
                        console.log(e.target.value);

                    }} />

                    <button className="bg-[#45a049] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={
                        () => {
                            window.location.reload();
                        }
                    } >
                        Refresh
                    </button>

                    <button className="bg-[#45a049] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={
                        () => {
                            //ShowAddDialog();
                            setAddResultDialog(true);
                        }
                    } >
                        Add new result
                    </button>


                </div>

                <div className="flex flex-col rounded-xl  w-full p-2 justify-center items-center">
                    <div className="flex bg-[#45a049] text-white flex-row border-b text-sm items-center justify-start border-t w-full ">
                        <p className="w-1/3 border-r pt-3 pb-3  border-l  text-center font-bold">Time</p>
                        <p className="w-1/3 border-r pt-3 pb-3 border-l  text-center font-bold">Result</p>
                    </div>

                    {
                        list.length > 0 ? <ShowList list={list} onDelete={onDelete} showEditDialog={showEditDialog} /> : <p className="text-sm m-4 font-bold text-[#45a049]">No data</p>
                    }

                </div>



            </div>
            {addResultDialog && (
                <ShowAddDialog id={editId} onClose={() => setAddResultDialog(false)} onSuccess={onSuccess} />
            )}
        </div>

    );
}


function ShowList({ list, onDelete, showEditDialog }) {
    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                list.map(d => (
                    <Card onDelete={onDelete} showEditDialog={showEditDialog} key={d.time} id={d.id} time={d.time} coupon={"Tejas"} result={d.result} />
                ))
            }
        </>
    )
}

// eslint-disable-next-line react/prop-types
function Card({ id, time, coupon, result, onDelete,showEditDialog }) {

    return (
        <div className="h-[50px] flex bg-white text-black flex-row border-b text-sm items-center justify-around border-t w-full">
            <p className="w-1/3 border-r pt-3 pb-3  border-l text-center">{time}</p>
            <p className="w-1/3 border-r pt-3 pb-3  border-l  text-center">{result.toString().padStart(2, '0')}</p>

            <div className="justify-center gap-10 flex-row w-1/3 border-r flex items-center pt-3 pb-3   border-l  text-center">
                <button onClick={() => onDelete(id)} className=" border border-red-600 p-2 rounded-md text-red-600 border-l  text-center font-bold">Delete</button>
                <button onClick={() => showEditDialog(id)} className=" border bg-blue-600 p-2 rounded-md text-white pt-3 pb-3 border-l  text-center font-bold">Update</button>

            </div>

        </div>
    );
}


// eslint-disable-next-line no-unused-vars
function ShowAddDialog({ onClose, onSuccess, id }) {

    return (
        <div className="absolute top-0  h-full flex items-center rounded-xl justify-start  bg-opacity-50">
            <div className="bg-white p-4 w-[500px] rounded-2xl items-start">
                <h1 className="text-2xl font-bold text-[#121b99]">{id == null ? "Add New Result" : "Update Result"}</h1>
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
    const [upload, setUpload] = useState(false)

    const fetchDataById = async () => {
        console.log(id);
        
        if(id != null){
            console.log("id is not null");
            
            const result = async () => await db.sql`select * from t_coupon where id = ${id}`;
            result().then((res) => {
                console.log(res);
                const date = new Date(reverseDate(res[0].date))
                const hours = res[0].time.toString().split(':')[0].toString().padStart(2, '0')
                const minutes = res[0].time.toString().split(':')[1].toString().padStart(2, '0')
                console.log(hours,minutes);
                
                setCurrentDate(date)
                setCurrentTime(`${hours}:${minutes}`)
                
                console.log(currentTime);
                
                
                
                setNumber(res[0].result)
            }).catch((error) => {
                console.log(error)
            })
        }
        

    }

    useEffect(() => {
        fetchDataById()
    },[id])


    // eslint-disable-next-line no-unused-vars
    const handleUpload = async (date, time, number) => {
        if(id== null){
            const result = async () => {
                await db.sql`
            INSERT INTO t_coupon(date, time, result) VALUES (${date}, ${time}, ${number});`
            }
    
            result().then(() => {
                setUpload(true)
                onSuccess()
            }).catch((error) => {
                console.log(error)
            })
        }else{
            const result = async () => {
                await db.sql`
            UPDATE t_coupon SET date = ${date}, time = ${time}, result = ${number} WHERE id = ${id};`
            }
    
            result().then(() => {
                setUpload(true)
                onSuccess()
            }).catch((error) => {
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
            } value={`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`} className="m-2 w-[90%] border border-black rounded-[10px] p-2" />



            <h1 className="w-[90%] text-[16px] font-bold text-start">Time</h1>
            <input
                type="time"
                id="time"
                value={currentTime}
                onChange={handleChange}
                className="m-2 w-[90%] border border-black rounded-[10px] p-2"
            />

            <h1 className="w-[90%] text-[16px] font-bold text-start">Number</h1>
            <input type="number" value={number} onChange={
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
                upload && (
                    <h1 className="w-[90%] p-2 rounded-xl m-2 text-xl font-bold text-center bg-[#45a04930] text-[#45a049]">Successfully Upload</h1>
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



