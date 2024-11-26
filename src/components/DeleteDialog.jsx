

function DeleteDialog({onDelete, onClose, id }) {

   
    return (
        
        <div className="fixed top-0 h-full w-full bg-black bg-opacity-70 flex items-center justify-center ">

            <div className="bg-white p-4 w-[90%] md:w-[500px] border shadow-xl shadow-gray-500 border-[#121b99] rounded-2xl items-start">
                <h1 className="text-xl p-2 text-start border-b border-gray-400 font-bold text-red-600">Alert</h1>
                <h1 className="text-sm p-2 text-center  ">Are you sure you want to delete this coupon?, if yes click confirm</h1>
                <div className=" w-full flex justify-end">
                    <button onClick={() => onClose()} className="m-2 w-[100px] hover:bg-red-600 hover:text-white border border-red-600 text-red-600 rounded-md p-2">Close</button>
                    <button onClick={() => {
                        console.log(id);
                        onDelete(id)
                    }} className="m-2  border bg-[#45a049] w-[100px] hover:bg-green-950 text-white rounded-md p-2">Confirm</button>

                </div>


            </div>

        </div>

    )

}

export default DeleteDialog