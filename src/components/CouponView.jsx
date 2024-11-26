
import db from "../db/db_connection";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import ShowAddDialog from "./AddUploadDialog";
import DeleteDialog from "./DeleteDialog";

export default function CouponView() {

    // eslint-disable-next-line no-unused-vars
    const [editId, setEditId] = useState(null);
    const [addResultDialog, setAddResultDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [currentDate, setCurrentDate] = useState(new Date());

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
        setEditId(null);
        setShowDeleteDialog(false);
    }


    return (

        <div className="w-full flex flex-col items-center justify-center" >
            <div className="w-full pt-5 flex flex-col item-center justify-center p-2">
                <div className="flex flex-col sm:flex-row m-5 justify-center gap-4 items-center">
                    <p className="text-sm text-[#45a049]">Date</p>

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
                        list.length > 0 ? <ShowList list={list} onDelete={
                            (id) => {
                                setEditId(id);
                                setShowDeleteDialog(true);
                                
                            }
                        } showEditDialog={showEditDialog} /> : <p className="text-sm m-4 font-bold text-[#45a049]">No data</p>
                    }

                </div>



            </div>
            {addResultDialog && (
                <ShowAddDialog id={editId} onClose={() => {
                    setEditId(null);
                    setAddResultDialog(false);
                }} onSuccess={onSuccess} />
            )}

            {
                showDeleteDialog && (
                    <DeleteDialog id={editId} onClose={() => {
                        setEditId(null);
                        setShowDeleteDialog(false);
                    }} onDelete={onDelete} />
                )
            }
        </div>

    );
}


function ShowList({ list, onDelete, showEditDialog }) {
    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                list.map(d => (
                    <Card onDelete={onDelete} showEditDialog={showEditDialog} key={d.time} id={d.id} time={d.time} result={d.result} />
                ))
            }
        </>
    )
}


