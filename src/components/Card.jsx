function Card({ id, time, result, onDelete, showEditDialog }) {

    return (
        <div className="h-fit flex bg-white text-black flex-row border-b text-sm items-center justify-around border-t w-full">
            <p className="w-1/3 h-full text-[16px] p-2 border-r border-l text-center"><span className="p-2">{time}</span></p>
            <p className="w-1/3 border-r text-[16px] border-l pt-3 pb-3  text-center"><span className="p-2">{result.toString().padStart(2, '0')}</span></p>

            <div className="justify-center flex-col md:flex-row  gap-1 sm:gap-5 md:gap-10 w-1/3 border-r flex items-center p-2 border-l  text-center">
                <button onClick={() => onDelete(id)} className="   rounded-[50%] text-red-600 hover:bg-slate-400/20 text-xl  text-center p-2">❌</button>
                <button onClick={() => showEditDialog(id)} className=" rounded-[50%] text-xl rotate-30 text-blue-600 hover:bg-slate-400/20  text-center p-2">📝</button>

            </div>

        </div>
    );
}

export default Card