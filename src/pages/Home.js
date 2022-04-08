import React, { useEffect, useState } from "react";
import TableContainer from "../Services/TableContainer";
import ReactSwitch from "react-switch";
// import NewTable from "../Services/NewTable";

const API_URL = process.env.REACT_APP_API_URL;

function Home() {
    const token = localStorage.getItem("token");
    const [risposta, setRisposta] = useState({isReady: false});
    const [trash, setTrash] = useState({checked: false});
    const [label, setLabel] = useState("");
    const [page, setPage] = useState(1);
    const [max, setMax] = useState(1)

    const columns = React.useMemo(() => [
        {
            Header: "Targa",
            accessor: "plate"
        },{
            Header: "Modello",
            accessor: "carModel"
        },{
            Header: "Combustibile",
            accessor: "fuel"
        }], [])

    useEffect(() => {
        const datajson = JSON.stringify({
            "page": page,
        });
        vehicle_info(datajson);
        if (trash.checked){
            setLabel("Vedi articoli")
        } else {
            setLabel("Vedi cestino")
        }
    }, [trash.checked, page]);

    const vehicle_info = (datajson) => {
        let link = "";

        if (trash.checked){
            link = "trash";
            setLabel("Vedi articoli")
        } else {
            link = "query";
            setLabel("Vedi cestino")
        }
        
        fetch(`${API_URL}/vehicle/${link}`, {
            method: "POST",
            headers: {"Authorization": token, "Content-type": "application/json"},
            body: datajson
        }).then((response) => {
            if (response.ok){
                return response.json();
            }
            throw new Error ("Unauthorized");
        }).then((json) => {
            setRisposta({data: json.docs, isReady: true});
            setMax(json.pages);
        }).catch(() => {
            setRisposta({data: "error", isReady: true});
        });
    }

    function make_table(info){
        let data = [];
        info.forEach((ele) => {
            data.push({
                plate: ele.plate,
                carModel: ele.carModel,
                fuel: ele.fuel[0]
            })
        });
        
        return (data)
    }

    function handleTrash() {
        if (trash.checked){
            setTrash({checked: false});
        } else {
            setTrash({checked: true});
        }
    }

    function nextPage() {
        let p = page
        if (p < max){
            setPage(p += 1);
        }
    }

    function prevPage() {
        let p = page
        if (p > 1){
            setPage(p -= 1);
        }
    }

    if (!risposta.isReady){
        return(
            <>
            <div>
                <h1>Loading vehicle list...</h1>
            </div>
            </>
        )
    } else if (risposta.data !== "error"){
        const data = make_table(risposta.data);

        return(
            <>
                <div>
                    <h1>Tabella Veicoli</h1>
                </div>
                <div>
                    <p>{label}</p>
                    <ReactSwitch onChange={handleTrash} checked = {trash.checked} />
                </div>
                {/* <TableContainer columns={columns} data={data} /> */}
                <TableContainer columns={columns} data={data} />
                <button onClick={prevPage}>{"<"}</button>
                <button onClick={nextPage}>{">"}</button>
            </>
        )

    } else {
        return(
            <div>
                <h1>Request Error</h1>
            </div>
        )
    }
}

export default Home;